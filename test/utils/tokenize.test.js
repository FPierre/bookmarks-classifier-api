const test = require('ava')

const { tokenize } = require('../../src/utils')

test('success to lower case text', t => {
  const tokenized = tokenize('TEXT TO LOWER CASE')

  t.deepEqual(tokenized, ['text', 'to', 'lower', 'case'])
})

test('success to sanitize text', t => {
  const tokenized = tokenize('text | to &&sanitize')

  t.deepEqual(tokenized, ['text', 'to', 'sanitize'])
})

test('success to trim text', t => {
  const tokenized = tokenize(' text to trim  ')

  t.deepEqual(tokenized, ['text', 'to', 'trim'])
})

test('success to tokenize text', t => {
  const tokenized = tokenize("  TEXT -to- t'okenize .  ")

  t.deepEqual(tokenized, ['text', 'to', 't', 'okenize'])
})
