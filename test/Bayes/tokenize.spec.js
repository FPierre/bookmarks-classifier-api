import test from 'ava'

const bayes = require('../../bayes')

test.beforeEach(t => {
  t.context.bayes = bayes
})

test('success to lower case text', t => {
  const { bayes } = t.context
  const text = 'TEXT TO LOWER CASE'

  const tokenized = bayes.tokenize(text)

  t.deepEqual(['text', 'to', 'lower', 'case'], tokenized)
})

test('success to sanitize text', t => {
  const { bayes } = t.context
  const text = ' text | to &&sanitize'

  const tokenized = bayes.tokenize(text)

  t.deepEqual(['text', 'to', 'sanitize'], tokenized)
})

test('success to trim text', t => {
  const { bayes } = t.context
  const text = ' text to trim  '

  const tokenized = bayes.tokenize(text)

  t.deepEqual(['text', 'to', 'trim'], tokenized)
})

test('success to tokenize text', t => {
  const { bayes } = t.context
  const text = "  TEXT -to- t'okenize .  "

  const tokenized = bayes.tokenize(text)

  t.deepEqual(['text', 'to', 't', 'okenize'], tokenized)
})
