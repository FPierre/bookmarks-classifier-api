import test from 'ava'

const bayes = require('../../bayes')

test.beforeEach(t => {
  t.context.bayes = bayes
})

test('success to sum the number of words', t => {
  const { bayes } = t.context

  bayes.setWordsCount('jellyfish')
  bayes.setWordsCount('jellyfish')

  t.deepEqual(bayes.wordsCount, { 'jellyfish': 2 })
})
