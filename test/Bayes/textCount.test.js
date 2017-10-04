import test from 'ava'

const bayes = require('../../bayes')

test('success to return 0 for non-existent tag', t => {
  const count = bayes.textCount('javascript')

  t.deepEqual(count, 0)
})

test('success to return the sum of texts for existent tag', t => {
  bayes.train('Article about JavaScript', 'javascript')
  const count = bayes.textCount('javascript')

  t.deepEqual(count, 1)
})
