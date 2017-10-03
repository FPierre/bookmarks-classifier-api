import test from 'ava'

const bayes = require('../../bayes')

test.beforeEach(t => {
  t.context.bayes = bayes
})

test('success to add non existant tag in bayes tags', t => {
  const { bayes } = t.context
  const tag = 'JavaScript'

  bayes.setTag(tag)

  t.is(1, bayes.tags.length)
  t.is(tag, bayes.tags[0])
})

test('fails to add existant tag in bayes tags', t => {
  const { bayes } = t.context
  const tag = 'JavaScript'

  bayes.setTag(tag)
  bayes.setTag(tag)

  t.is(1, bayes.tags.length)
})
