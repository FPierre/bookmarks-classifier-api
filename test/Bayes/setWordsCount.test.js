import test from 'ava'

const bayes = require('../../bayes')

test('success to sum the number of words', t => {
  bayes.setWordsCount('jellyfish')
  bayes.setWordsCount('jellyfish')

  t.deepEqual(bayes.wordsCount, { 'jellyfish': 2 })
})
