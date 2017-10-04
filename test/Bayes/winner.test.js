import test from 'ava'

const bayes = require('../../bayes')

test('success to train the model', t => {
  const sanitizedTrainers = [
    { tag: 'javascript', lang: 'en', text: 'Article title JavaScript' },
    { tag: 'javascript', lang: 'en', text: 'Title talking JavaScript' },
    { tag: 'performance', lang: 'en', text: 'News speaks performance' }
  ]

  for (const trainer of sanitizedTrainers) {
    bayes.train(trainer.text, trainer.tag)
  }

  bayes.guess('JavaScript')

  const winner = bayes.winner()

  t.is(winner.tag, 'javascript')
  t.true(winner.score >= 0.8)
})
