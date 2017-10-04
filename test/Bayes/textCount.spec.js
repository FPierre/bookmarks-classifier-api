import test from 'ava'

const bayes = require('../../bayes')

test.beforeEach(t => {
  t.context.bayes = bayes
})

test('success to return 0 for non-existent tag', t => {
  const { bayes } = t.context

  const count = bayes.textCount('javascript')

  t.deepEqual(count, 0)
})

test('success to return the sum of texts for existent tag', t => {
  const { bayes } = t.context

  bayes.train('Article about JavaScript', 'javascript')
  const count = bayes.textCount('javascript')

  t.deepEqual(count, 1)
})
