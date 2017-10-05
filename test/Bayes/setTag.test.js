import test from 'ava'

import bayes from '../../src/bayes'

test('success to add non existant tag in bayes tags', t => {
  const tag = 'JavaScript'

  bayes.setTag(tag)

  t.is(bayes.tags.length, 1)
  t.deepEqual(bayes.tags, [tag])
})

test('fails to add existant tag in bayes tags', t => {
  const tag = 'JavaScript'

  bayes.setTag(tag)
  bayes.setTag(tag)

  t.is(bayes.tags.length, 1)
  t.deepEqual(bayes.tags, [tag])
})
