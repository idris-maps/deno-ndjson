#!/usr/bin/env -S deno run

import { readLines } from 'https://deno.land/std@0.66.0/io/bufio.ts'

let [expression, initialValue] = Deno.args

if (!expression) {
  let data = []

  for await (const line of readLines(Deno.stdin)) {
    if (line === '') {
      console.log(JSON.stringify(data))
    } else {
      data.push(JSON.parse(line))
    }
  }  
} else {
  let i = 0
  let acc

  try {
    acc = JSON.parse(initialValue)
  } catch (err) {
    console.log(`
      could not parse initial value: ${initialValue}
    `)
    throw err
  }

  for await (const line of readLines(Deno.stdin)) {
    if (line === '') {
      console.log(JSON.stringify(acc))
    } else {
      const func = eval(`(a, d, i) => ${expression}`)
      acc = func(acc, JSON.parse(line), i)
      i = i + 1
    }
  }  
}
