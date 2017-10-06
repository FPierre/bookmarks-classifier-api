import test from 'ava'

import Bayes from '../../src/Bayes'

test('success to reset bayes', t => {
  const bayes = new Bayes()

  bayes.tags = ['JavaScript']
  bayes.wordsByTag = { 'Javascript': 1 }
  bayes.textCountByTag = { 'JavaScript': 1 }

  bayes.resetTraining()

  t.deepEqual(bayes.tags, [])
  t.deepEqual(bayes.wordsByTag, {})
  t.deepEqual(bayes.textCountByTag, {})
})
