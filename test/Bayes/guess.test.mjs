import test from 'ava'

import Bayes from '../../src/Bayes'

test.beforeEach(t => {
  const sanitizedTrainers = [
    { tag: 'javascript', lang: 'en', text: 'Article title JavaScript' },
    { tag: 'javascript', lang: 'en', text: 'Title talking JavaScript' },
    { tag: 'performance', lang: 'en', text: 'News speaks performance' }
  ]

  const bayesInstance = new Bayes()

  for (const trainer of sanitizedTrainers) {
    bayesInstance.train(trainer.text, trainer.tag)
  }

  t.context.bayes = bayesInstance
})

test('success to train the model', t => {
  const { bayes } = t.context

  bayes.guess('JavaScript')

  t.true(bayes.scores.javascript >= 0.8)
})

test('success to train the model', t => {
  const { bayes } = t.context

  bayes.guess('JavaScript is a great programming language')

  t.true(bayes.scores.javascript >= 0.8)
})
