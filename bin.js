#!/usr/bin/env node

const makeJson = require('./index.js')
const concat = require('concat-stream')

process.stdout.on('error', function () {})

const stream = process.stdin

const concatStream = concat({ encoding: 'string' }, function (data) {
  const output = makeJson(data)
  process.exitCode = output.length ? 1 : 0
  console.log(JSON.stringify(output))
})
stream.pipe(concatStream)

stream.on('error', handleError)

function handleError (err) {
  console.error(err)
  process.exit(1)
}
