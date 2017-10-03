import test from 'ava'

const bayes = require('../../bayes')

test.beforeEach(t => {
  t.context.bayes = bayes
})

test('success to lower case text', t => {
  const { bayes } = t.context
  const text = 'TEXT TO TOKENIZE'

  const tokenized = bayes.tokenize(text)

  t.deepEqual(['text', 'to', 'tokenize'], tokenized)
})
