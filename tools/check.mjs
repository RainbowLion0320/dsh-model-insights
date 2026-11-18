#!/usr/bin/env node
/**
 * Sanity check for the derived grades.
 *
 *   node tools/check.mjs
 *
 * Asserts what the badge promises: every S model is Pareto-optimal (no other
 * model is both smarter and cheaper), no dominated model is graded S, and the
 * letter order follows the layer order.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const data = JSON.parse(readFileSync(join(ROOT, 'data', 'aa.json'), 'utf8'))
const models = data.models.filter((m) => m.c !== null)

const dominates = (a, b) => a !== b && a.i >= b.i && a.c <= b.c && (a.i > b.i || a.c < b.c)
const errors = []

for (const m of models) {
  const dominated = models.some((other) => dominates(other, m))
  if (m.r === 'S' && dominated) errors.push(`S but dominated: ${m.n}`)
  if (m.r !== 'S' && !dominated) errors.push(`not S but nobody dominates it: ${m.n}`)
  if (m.p !== (m.r === 'S' ? 1 : 0)) errors.push(`frontier flag disagrees with grade: ${m.n}`)
}

const order = { S: 1, A: 2, B: 3, C: 4, D: 5 }
for (const m of models) {
  if (m.y === null) continue
  if (order[m.r] === undefined) errors.push(`unknown grade: ${m.n} ${m.r}`)
  if (m.y >= 5 && m.r !== 'D') errors.push(`layer ${m.y} should be D: ${m.n}`)
  if (m.y < 5 && order[m.r] !== m.y) errors.push(`layer/letter mismatch: ${m.n} layer ${m.y} ${m.r}`)
}

const counts = {}
for (const m of data.models) counts[m.r || '—'] = (counts[m.r || '—'] || 0) + 1
console.log('grades:', JSON.stringify(counts), '| snapshot', data.snapshot)
console.log('frontier:', models.filter((m) => m.r === 'S').map((m) => `${m.n} (IQ${m.i} $${m.c})`).join(', '))

if (errors.length) {
  console.error('\nFAILED')
  for (const error of errors) console.error(' -', error)
  process.exit(1)
}
console.log('\nOK: every S model is Pareto-optimal and every dominated model is graded below S.')
