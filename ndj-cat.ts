#!/usr/bin/env -S deno run --allow-read

const decoder = new TextDecoder('utf-8')
const [file] = Deno.args

if (!file) {
  console.log(`
    file to read needs to be defined
  `)
}

try {
  const data = await Deno.readFile(file)

  let line = ''
  
  for ( const d of decoder.decode(data)) {
    if (d === '\n') {
      console.log(line)
      line = ''
    } else {
      line = line + d
    }
  }
} catch (err) {
  if (err.message.includes('No such file')) {
    console.log(`
      ${file} does not exist
    `)
  }
  throw err
}

