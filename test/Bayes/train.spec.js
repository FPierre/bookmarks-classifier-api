import test from 'ava'

const bayes = require('../../bayes')
const { sanitizeTexts } = require('../../utils')

test('success to train the model', t => {
  const sanitizedTrainers = [
    { tag: 'javascript', lang: 'en', text: 'Article title JavaScript' },
    { tag: 'javascript', lang: 'en', text: 'Title talking JavaScript' },
    { tag: 'performance', lang: 'en', text: 'News speaks performance' }
  ]

  for (const trainer of sanitizedTrainers) {
    bayes.train(trainer.text, trainer.tag)
  }

  const expectedTags = ['javascript', 'performance']
  const expectedWordsByTag = {
    javascript: {
      article: 1,
      javascript: 2,
      talking: 1,
      title: 2
    },
    performance: {
      news: 1,
      performance: 1,
      speaks: 1
    }
  }
  const expectedWordsCount = {
    article: 1,
    javascript: 2,
    news: 1,
    performance: 1,
    speaks: 1,
    talking: 1,
    title: 2
  }
  const expectedTextCountByTag = { javascript: 2, performance: 1 }

  t.deepEqual(bayes.tags, expectedTags)
  t.deepEqual(bayes.wordsByTag, expectedWordsByTag)
  t.deepEqual(bayes.wordsCount, expectedWordsCount)
  t.deepEqual(bayes.textCountByTag, expectedTextCountByTag)
})
