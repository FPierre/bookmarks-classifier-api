import test from 'ava'

import Bayes from '../../src/Bayes'

test('success to sum the number of words', t => {
  const bayes = new Bayes()

  bayes.setWordsCount('jellyfish')
  bayes.setWordsCount('jellyfish')

  t.deepEqual(bayes.wordsCount, { 'jellyfish': 2 })
})
