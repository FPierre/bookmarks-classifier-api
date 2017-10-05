import express from 'express'
import bodyParser from 'body-parser'

import bayes from './src/bayes'
const { sanitizeTexts } from './src/utils'
import rubyTrainer from './src/trainers/ruby-trainer'
import javaScriptTrainer from './src/trainers/javascript-trainer'
import linuxTrainer from './src/trainers/linux-trainer'
import performanceTrainer from './src/trainers/performance-trainer'

import pendingTexts from './src/extractor/tagged-bookmarks.json'

const trainers = [
  ...rubyTrainer,
  ...javaScriptTrainer,
  ...linuxTrainer,
  ...performanceTrainer
]

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// const sanitizedTrainers = sanitizeTexts(trainers)

// for (const trainer of sanitizedTrainers) {
//   bayes.train(trainer.text, trainer.tag)
// }

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

// app.get('/trainers', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET')
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
//
//   // res.json({ trainers:  })
// })

app.listen(3003)
