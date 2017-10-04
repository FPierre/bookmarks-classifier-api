import test from 'ava'

const bayes = require('../../bayes')

test.beforeEach(t => {
  t.context.bayes = bayes
})

test('success to return train the model', t => {
  const { bayes } = t.context

  const count = bayes.textCount('javascript')

  t.deepEqual(count, 0)
})

test('success to trains the model', t => {
  const { bayes } = t.context

  bayes.train('Article about JavaScript', 'javascript')
  const count = bayes.textCount('javascript')

  t.deepEqual(count, 1)
})
