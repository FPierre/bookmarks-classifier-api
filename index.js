const express = require('express')
const bodyParser = require('body-parser')

const Bayes = require('./src/Bayes')
const sanitizeTexts = require('./src/utils')
const rubyTrainer = require('./src/trainers/ruby-trainer')
const javaScriptTrainer = require('./src/trainers/javascript-trainer')
const linuxTrainer = require('./src/trainers/linux-trainer')
const performanceTrainer = require('./src/trainers/performance-trainer')

const pendingTexts = require('./src/extractor/tagged-bookmarks.json')

const trainers = [
  ...rubyTrainer,
  ...javaScriptTrainer,
  ...linuxTrainer,
  ...performanceTrainer
]

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const bayes = new Bayes()

// const sanitizedTrainers = sanitizeTexts(trainers)

// for (const trainer of sanitizedTrainers) {
//   bayes.train(trainer.text, trainer.tag)
// }
/*
app.get('/pending', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.json({ texts: pendingTexts })
})

app.post('/guess', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  console.log(bayes.guess(req.body.text))
  res.json({ scores: bayes.guess(req.body.text) })
})
*/
// app.get('/trainers', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET')
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
//
//   // res.json({ trainers:  })
// })

//app.listen(3003)
