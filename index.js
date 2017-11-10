const bodyParser = require('body-parser')
const express = require('express')

const { sanitizeTexts } = require('./src/utils')
const { trainers } = require('./src/trainers')
const Bayes = require('./src/Bayes')
const pendingTexts = require('./src/extractor/tagged-bookmarks.json')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const bayes = new Bayes()

const sanitizedTrainers = sanitizeTexts(trainers)

for (const { text, tag } of sanitizedTrainers) {
  bayes.train(text, tag)
}

app.get('/pending', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.json({ pendingTexts })
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
