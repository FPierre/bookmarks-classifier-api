const test = require('ava')

const { sanitizeTexts } = require('../../src/utils')

test('sucess to remove stops words', t => {
  const sanitized = sanitizeTexts([{ text: 'Article talking about JavaScript', lang: 'en' }])

  t.deepEqual(sanitized, [{ text: 'Article talking JavaScript', lang: 'en' }])
})
