#!/usr/bin/env node
/**
 * Sanity check for the derived grades.
 *
 *   node tools/check.mjs
 *
 * Every point gets a grade from its Pareto layer over all effort points, so:
 * - an S point must not be dominated by any other point,
 * - a dominated point must never be S,
 * - a model's grade range must be the min/max of its own points.
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const data = JSON.parse(readFileSync(join(ROOT, 'data', 'aa.json'), 'utf8'))
const points = data.models.flatMap((row) => row.pts.map((p) => ({ ...p, model: row.n })))
const RANK = { S: 0, A: 1, B: 2, C: 3, D: 4 }
const errors = []

const dominates = (a, b) => a !== b && a.i >= b.i && a.c <= b.c && (a.i > b.i || a.c < b.c)

for (const point of points) {
  const dominated = points.some((other) => dominates(other, point))
  if (point.r === 'S' && dominated) errors.push(`S but dominated: ${point.model} ${point.e}`)
  if (point.r !== 'S' && !dominated) errors.push(`not S but nobody dominates it: ${point.model} ${point.e}`)
}

for (const row of data.models) {
  const grades = row.pts.map((p) => p.r).sort((a, b) => RANK[a] - RANK[b])
  if (grades[0] !== row.gr[0]) errors.push(`best grade mismatch: ${row.n}`)
  if (grades[grades.length - 1] !== row.gr[1]) errors.push(`worst grade mismatch: ${row.n}`)
  const iqs = row.pts.map((p) => p.i)
  if (Math.round(Math.min(...iqs)) !== Math.round(row.iq[0]) || Math.round(Math.max(...iqs)) !== Math.round(row.iq[1])) {
    errors.push(`iq range mismatch: ${row.n}`)
  }
  if (row.p !== (row.pts.some((p) => p.r === 'S') ? 1 : 0)) errors.push(`frontier flag disagrees: ${row.n}`)
}

const counts = {}
for (const row of data.models) counts[row.gr[0]] = (counts[row.gr[0]] || 0) + 1
console.log(`snapshot ${data.snapshot}: ${data.models.length} models, ${data.points} effort points, ${data.layers} layers`)
console.log('best-grade counts:', JSON.stringify(counts))
console.log(
  'frontier:',
  data.models
    .filter((row) => row.p)
    .slice(0, 8)
    .map((row) => `${row.n} (IQ ${Math.round(row.iq[0])}-${Math.round(row.iq[1])})`)
    .join(', '),
)

if (errors.length) {
  console.error('\nFAILED')
  for (const error of errors.slice(0, 20)) console.error(' -', error)
  process.exit(1)
}
console.log('\nOK: every S point is Pareto-optimal, every dominated point grades below S, ranges match the points.')
