#!/usr/bin/env -S deno run

import { readLines } from 'https://deno.land/std@0.66.0/io/bufio.ts'

const [expression] = Deno.args

let i = 0

for await (const line of readLines(Deno.stdin)) {
  if (line !== '') {
    eval(`
      try {
        const func = (d, i) => ${expression}
        if (func(${line}, ${i})) {
          console.log(JSON.stringify(${line}))
        }
      } catch (err) {
        throw err
      }
    `)
    i = i + 1
  }
}
