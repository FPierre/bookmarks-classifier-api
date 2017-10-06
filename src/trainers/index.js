const rubyTrainer = require('./ruby-trainer')
const javaScriptTrainer = require('./javascript-trainer')
const linuxTrainer = require('./linux-trainer')
const performanceTrainer = require('./performance-trainer')

exports.trainers = [
  ...rubyTrainer,
  ...javaScriptTrainer,
  ...linuxTrainer,
  ...performanceTrainer
]
