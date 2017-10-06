const test = require('ava')

const Bayes = require('../../src/Bayes')

test.beforeEach(t => {
  t.context.bayes = new Bayes()
})

test('success to lower case text', t => {
  const { bayes } = t.context

  const tokenized = bayes.tokenize('TEXT TO LOWER CASE')

  t.deepEqual(tokenized, ['text', 'to', 'lower', 'case'])
})

test('success to sanitize text', t => {
  const { bayes } = t.context

  const tokenized = bayes.tokenize('text | to &&sanitize')

  t.deepEqual(tokenized, ['text', 'to', 'sanitize'])
})

test('success to trim text', t => {
  const { bayes } = t.context

  const tokenized = bayes.tokenize(' text to trim  ')

  t.deepEqual(tokenized, ['text', 'to', 'trim'])
})

test('success to tokenize text', t => {
  const { bayes } = t.context

  const tokenized = bayes.tokenize("  TEXT -to- t'okenize .  ")

  t.deepEqual(tokenized, ['text', 'to', 't', 'okenize'])
})
