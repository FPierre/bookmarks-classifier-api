const test = require('ava')

const Bayes = require('../../src/Bayes')

test.beforeEach(t => {
  t.context.bayes = new Bayes()
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
