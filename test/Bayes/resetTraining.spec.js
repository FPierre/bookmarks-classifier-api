import test from 'ava'

const bayes = require('../../bayes')

test.beforeEach(t => {
  t.context.bayes = bayes
})

test('success to reset bayes', t => {
  const { bayes } = t.context

  bayes.tags = ['JavaScript']
  bayes.wordsByTag = { 'Javascript': 1 }
  bayes.textCountByTag = { 'JavaScript': 1 }

  bayes.resetTraining()

  t.is(0, bayes.tags.length)
  t.is(0, Object.keys(bayes.wordsByTag).length)
  t.is(0, Object.keys(bayes.textCountByTag).length)
})
