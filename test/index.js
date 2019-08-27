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
      ruleId: undefined
    }, {
      line: '15',
      column: '36',
      message: 'Extra semicolon.',
      ruleId: undefined
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
      ruleId: 'quotes'
    }, {
      line: '15',
      column: '36',
      message: 'Extra semicolon.',
      ruleId: 'semi'
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
      ruleId: 'quotes'
    }, {
      line: '15',
      column: '36',
      message: 'Extra semicolon.',
      ruleId: 'semi'
    }]
  }]

  const output = jsonify(data)

  t.deepEqual(output, dataJson, 'JSON formatted')
})

test('standard-json parenthesis in message', function (t) {
  t.plan(1)
  const data = fs.readFileSync(path.join(__dirname, 'data-paren-in-msg.txt'), { encoding: 'utf8' })
  const dataJson = [{ filePath: '/someplace/index.js', messages: [{ column: '18', line: '1', message: 'Missing \'()\' invoking a constructor.', ruleId: undefined }] }]

  const output = jsonify(data)

  t.deepEqual(output, dataJson, 'JSON formatted')
})
