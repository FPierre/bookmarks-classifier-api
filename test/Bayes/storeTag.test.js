const test = require('ava')

const Bayes = require('../../src/Bayes')

test.beforeEach(t => {
  t.context.bayes = new Bayes()
})

test('success to add non existant tag in bayes tags', t => {
  const { bayes } = t.context
  const tag = 'JavaScript'

  bayes.storeTag(tag)

  t.is(bayes.tags.length, 1)
  t.deepEqual(bayes.tags, [tag])
})

test('fails to add existant tag in bayes tags', t => {
  const { bayes } = t.context
  const tag = 'JavaScript'

  bayes.storeTag(tag)
  bayes.storeTag(tag)

  t.is(bayes.tags.length, 1)
  t.deepEqual(bayes.tags, [tag])
})
