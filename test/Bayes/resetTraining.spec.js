import test from 'ava'

const bayes = require('../../bayes')

test('success to reset bayes', t => {
  bayes.tags = ['JavaScript']
  bayes.wordsByTag = { 'Javascript': 1 }
  bayes.textCountByTag = { 'JavaScript': 1 }

  bayes.resetTraining()

  t.deepEqual(bayes.tags, [])
  t.deepEqual(bayes.wordsByTag, {})
  t.deepEqual(bayes.textCountByTag, {})
})
