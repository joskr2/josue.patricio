#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { inflateSync } from 'node:zlib'

const MIN_BYTES = 10_000
const MARKERS = ['GNB', 'GeneXus']
const PDFS = [
  'josue-patricio-retamozo-vargas-desarrollador-software-por-defecto.pdf',
  'josue-patricio-retamozo-vargas-software-developer-english-default.pdf',
]

const failures = []
const contents = new Map()

// PDF text lives inside FlateDecode streams, so inflate every stream and keep
// whatever decompresses. Kernel-split glyphs such as `(Gene)-20(Xus)` are
// merged back by dropping the numeric offsets between adjacent strings.
function extractText(buffer) {
  const source = buffer.toString('latin1')
  const stream = /stream\r?\n/g
  let text = ''
  let match = stream.exec(source)

  while (match !== null) {
    const start = match.index + match[0].length
    const end = source.indexOf('endstream', start)

    if (end !== -1) {
      try {
        text += inflateSync(buffer.subarray(start, end)).toString('latin1')
      } catch {
        // Not a FlateDecode stream (fonts, images, metadata): skip it.
      }
    }

    match = stream.exec(source)
  }

  return text.replace(/\)\s*[-+]?\d*\s*\(/g, '')
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
    failures.push(`${name}: PDF text is missing ${missing.join(', ')}`)
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
