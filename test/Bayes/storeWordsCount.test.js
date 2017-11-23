const test = require('ava')

const Bayes = require('../../src/Bayes')

test('success to sum the number of words', t => {
  const bayes = new Bayes()

  bayes.storeWordsCount('jellyfish')
  bayes.storeWordsCount('jellyfish')

  t.deepEqual(bayes.wordsCount, { 'jellyfish': 2 })
})
