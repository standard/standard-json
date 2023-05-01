const test = require('tape')
const jsonify = require('../')
const fs = require('fs')
const path = require('path')

test('standard-json', function (t) {
  t.plan(1)
  const data = fs.readFileSync(path.join(__dirname, 'data.txt'), { encoding: 'utf8' })
  const dataJson = [{
    filePath: '/someplace/index.js',
    messages: [{
      line: '5',
      column: '23',
      message: 'Strings must use singlequote.',
      ruleId: undefined,
      type: 'error'
    }, {
      line: '15',
      column: '36',
      message: 'Extra semicolon.',
      ruleId: undefined,
      type: 'error'
    }]
  }]

  const output = jsonify(data)

  t.deepEqual(output, dataJson, 'JSON formatted')
})

test('standard-json verbose', function (t) {
  t.plan(1)
  const data = fs.readFileSync(path.join(__dirname, 'data-verbose.txt'), { encoding: 'utf8' })
  const dataJson = [{
    filePath: '/someplace/index.js',
    messages: [{
      line: '5',
      column: '23',
      message: 'Strings must use singlequote.',
      ruleId: 'quotes',
      type: 'error'
    }, {
      line: '15',
      column: '36',
      message: 'Extra semicolon.',
      ruleId: 'semi',
      type: 'error'
    }]
  }]

  const output = jsonify(data)

  t.deepEqual(output, dataJson, 'JSON formatted')
})

test('standard-json verbose with Windows path', function (t) {
  t.plan(1)
  const data = fs.readFileSync(path.join(__dirname, 'data-verbose-windows.txt'), { encoding: 'utf8' })
  const dataJson = [{
    filePath: 'D:\\someplace\\index.js',
    messages: [{
      line: '5',
      column: '23',
      message: 'Strings must use singlequote.',
      ruleId: 'quotes',
      type: 'error'
    }, {
      line: '15',
      column: '36',
      message: 'Extra semicolon.',
      ruleId: 'semi',
      type: 'error'
    }]
  }]

  const output = jsonify(data)

  t.deepEqual(output, dataJson, 'JSON formatted')
})

test('standard-json parenthesis in message', function (t) {
  t.plan(1)
  const data = fs.readFileSync(path.join(__dirname, 'data-paren-in-msg.txt'), { encoding: 'utf8' })
  const dataJson = [{ filePath: '/someplace/index.js', messages: [{ column: '18', line: '1', message: 'Missing \'()\' invoking a constructor.', ruleId: undefined, type: 'error' }] }]

  const output = jsonify(data)

  t.deepEqual(output, dataJson, 'JSON formatted')
})

test('standard-json warning', function (t) {
  t.plan(1)
  const data = fs.readFileSync(path.join(__dirname, 'data-warning.txt'), { encoding: 'utf8' })
  const dataJson = [{
    filePath: '/someplace/index.js',
    messages: [{
      line: '2',
      column: '1',
      message: "'hello' is not defined.",
      ruleId: 'no-undef',
      type: 'error'
    }, {
      line: '2',
      column: '11',
      message: 'Expected property shorthand.',
      ruleId: 'object-shorthand',
      type: 'warning'
    }]
  }]

  const output = jsonify(data)

  t.deepEqual(output, dataJson, 'JSON formatted')
})
