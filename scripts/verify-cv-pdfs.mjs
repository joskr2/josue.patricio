#!/usr/bin/env node
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Updating a CV means overwriting a file in public/ under a stable name. This
// check guards the failure modes of that swap and nothing more: a missing
// file, a non-PDF or truncated upload, and the same file uploaded twice.
// Parsing the text out of the PDF is deliberately not done here — what the CV
// says is verified when it is exported, not by the site that serves it.
const MIN_BYTES = 10_000
const PDFS = ['cv-es.pdf', 'cv-en.pdf']

const PDF_HEADER = Buffer.from('%PDF-', 'latin1')
const PDF_TRAILER = Buffer.from('%%EOF', 'latin1')

const failures = []
const buffers = new Map()

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

  if (!buffer.subarray(0, PDF_HEADER.length).equals(PDF_HEADER)) {
    failures.push(`${name}: no %PDF- header, this is not a PDF`)
    continue
  }

  // The %%EOF marker lives in the last handful of bytes; scan a generous tail
  // window so trailing newline junk from the exporter cannot trip the check.
  if (!buffer.subarray(-1024).includes(PDF_TRAILER)) {
    failures.push(
      `${name}: no %%EOF trailer in the last 1 KB, upload is truncated`,
    )
    continue
  }

  buffers.set(name, buffer)
  console.log(`ok  public/${name} (${buffer.length} bytes)`)
}

if (buffers.size === PDFS.length) {
  const [first, second] = [...buffers.values()]

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
