#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { inflateSync } from 'node:zlib'

const MIN_BYTES = 10_000
const MARKERS = ['GNB', 'GeneXus']
const PDFS = ['CV_Josue_Retamozo_Espanol.pdf', 'CV_Josue_Retamozo_English.pdf']

const LITERAL_ESCAPES = { b: '\b', f: '\f', n: '\n', r: '\r', t: '\t' }

const failures = []
const contents = new Map()

function inflate(bytes) {
  if (bytes === null || bytes === undefined) return null

  try {
    return inflateSync(bytes).toString('latin1')
  } catch {
    // Not a FlateDecode stream (fonts, images, metadata): skip it.
    return null
  }
}

// These PDFs are a flat list of `N 0 obj` bodies. Stream bytes are kept raw so
// the FlateDecode ones can be inflated: that is where both the page text and
// the CID-font ToUnicode maps live.
function parseObjects(buffer) {
  const source = buffer.toString('latin1')
  const objects = new Map()
  const object = /(\d+)\s+0\s+obj\b/g
  let match = object.exec(source)

  while (match !== null) {
    const bodyStart = match.index + match[0].length
    const bodyEnd = source.indexOf('endobj', bodyStart)

    if (bodyEnd !== -1) {
      const body = source.slice(bodyStart, bodyEnd)
      const stream = /stream\r?\n/.exec(body)
      let bytes = null

      if (stream !== null) {
        const start = bodyStart + stream.index + stream[0].length
        const end = source.lastIndexOf('endstream', bodyEnd)
        if (end > start) bytes = buffer.subarray(start, end)
      }

      objects.set(Number(match[1]), {
        dictionary: stream === null ? body : body.slice(0, stream.index),
        stream: inflate(bytes),
      })
    }

    match = object.exec(source)
  }

  return objects
}

function utf16ToString(hex) {
  const digits = hex.replace(/\s+/g, '').padStart(4, '0')
  let text = ''

  for (let index = 0; index + 4 <= digits.length; index += 4) {
    text += String.fromCharCode(
      Number.parseInt(digits.slice(index, index + 4), 16),
    )
  }

  return text
}

// A ToUnicode CMap maps a two-byte glyph code to its text, which is the only
// way to read a PDF whose fonts are embedded as CID subsets.
function parseToUnicode(source) {
  const map = new Map()

  for (const [, block] of source.matchAll(/beginbfchar([\s\S]*?)endbfchar/g)) {
    const pairs = /<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>/g

    for (const [, code, value] of block.matchAll(pairs)) {
      map.set(Number.parseInt(code, 16), utf16ToString(value))
    }
  }

  for (const [, block] of source.matchAll(
    /beginbfrange([\s\S]*?)endbfrange/g,
  )) {
    const entries =
      /<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*(?:<([0-9A-Fa-f]+)>|\[([\s\S]*?)\])/g

    for (const entry of block.matchAll(entries)) {
      const first = Number.parseInt(entry[1], 16)
      const last = Number.parseInt(entry[2], 16)
      const listed = entry[4]?.matchAll(/<([0-9A-Fa-f]+)>/g)

      if (listed !== undefined) {
        let offset = 0
        for (const value of listed) {
          map.set(first + offset, utf16ToString(value[1]))
          offset += 1
        }
        continue
      }

      const target = Number.parseInt(entry[3], 16)
      for (let code = first; code <= last; code += 1) {
        map.set(code, utf16ToString((target + code - first).toString(16)))
      }
    }
  }

  return map
}

// Page resources name every font (`/F1 12 0 R`) and the font object points at
// its ToUnicode map. A font without one stays unmapped on purpose: guessing a
// CID glyph code would invent text.
function parseFonts(buffer, objects) {
  const source = buffer.toString('latin1')
  const fonts = new Map()

  for (const [, resources] of source.matchAll(/\/Font\s*<<([^>]*)>>/g)) {
    const references = /\/(\w+)\s+(\d+)\s+0\s+R/g

    for (const [, name, reference] of resources.matchAll(references)) {
      if (fonts.has(name)) continue

      const font = objects.get(Number(reference))
      const toUnicode = font?.dictionary.match(/\/ToUnicode\s+(\d+)\s+0\s+R/)
      const cmap = toUnicode
        ? objects.get(Number(toUnicode[1]))?.stream
        : undefined

      fonts.set(name, cmap ? parseToUnicode(cmap) : null)
    }
  }

  return fonts
}

function decodeHexString(hex, font) {
  const digits = hex.replace(/\s+/g, '')
  let text = ''

  for (let index = 0; index + 4 <= digits.length; index += 4) {
    const code = Number.parseInt(digits.slice(index, index + 4), 16)
    text += font?.get(code) ?? ''
  }

  return text
}

function decodeLiteralString(raw, font) {
  let text = ''

  for (let index = 0; index < raw.length; index += 1) {
    const char = raw[index]

    if (char !== '\\') {
      const code = raw.charCodeAt(index)
      text += font?.get(code) ?? char
      continue
    }

    const escaped = raw.slice(index + 1)
    const octal = /^[0-7]{1,3}/.exec(escaped)

    if (octal !== null) {
      text += String.fromCharCode(Number.parseInt(octal[0], 8))
      index += octal[0].length
      continue
    }

    const next = escaped[0] ?? ''
    text += LITERAL_ESCAPES[next] ?? next
    index += 1
  }

  return text
}

// Walk a content stream in order: a `Tf` operator selects the active font and
// every hex or literal string after it is written with that font. Numeric
// kerning offsets such as `(Gene)-20(Xus)` are skipped, so split runs rejoin.
function decodeContent(source, fonts) {
  const tokens =
    /\/(\w+)\s+[\d.]+\s+Tf|<([0-9A-Fa-f\s]+)>|\(((?:[^()\\]|\\.)*)\)/g
  let text = ''
  let font = null

  for (const token of source.matchAll(tokens)) {
    if (token[1] !== undefined) {
      font = fonts.get(token[1]) ?? null
      continue
    }

    if (token[2] !== undefined) {
      text += decodeHexString(token[2], font)
      continue
    }

    text += decodeLiteralString(token[3], font)
  }

  return text
}

function extractText(buffer) {
  const objects = parseObjects(buffer)
  const fonts = parseFonts(buffer, objects)
  let text = ''

  for (const object of objects.values()) {
    // Only page descriptions carry text operators.
    if (object.stream === null || !/\bT[Jj]\b/.test(object.stream)) continue

    text += decodeContent(object.stream, fonts)
  }

  return text
}

for (const name of PDFS) {
  const path = fileURLToPath(new URL(`../public/${name}`, import.meta.url))

  let buffer
  try {
    buffer = readFileSync(path)
  } catch {
    failures.push(`${name}: not found at public/${name}`)
    continue
  }

  if (buffer.length < MIN_BYTES) {
    failures.push(
      `${name}: only ${buffer.length} bytes, expected at least ${MIN_BYTES}`,
    )
    continue
  }

  const text = extractText(buffer)
  const missing = MARKERS.filter((marker) => !text.includes(marker))

  if (missing.length > 0) {
    failures.push(
      `${name}: PDF text is missing ${missing.join(', ')} (read ${text.length} characters)`,
    )
    continue
  }

  contents.set(name, buffer)
  console.log(`ok  public/${name}`)
  console.log(
    `    ${buffer.length} bytes, markers found: ${MARKERS.join(', ')}`,
  )
}

if (contents.size === PDFS.length) {
  const [first, second] = [...contents.values()]

  if (first.equals(second)) {
    failures.push('the two CV PDFs are byte-identical')
  } else {
    console.log('ok  the two CV PDFs are not byte-identical')
  }
}

if (failures.length > 0) {
  console.error('\nCV PDF verification failed:')
  for (const failure of failures) {
    console.error(`  - ${failure}`)
  }
  process.exit(1)
}

console.log(`\nVerified ${PDFS.length} CV PDFs.`)
