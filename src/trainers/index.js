const apiTrainer = require('./api-trainer')
const designPatternTrainer = require('./design-pattern-trainer')
const es6Trainer = require('./es6-trainer')
const javaScriptTrainer = require('./javascript-trainer')
const linuxTrainer = require('./linux-trainer')
const nginxTrainer = require('./nginx-trainer')
const nodejsTrainer = require('./nodejs-trainer')
const performanceTrainer = require('./performance-trainer')
const rubyTrainer = require('./ruby-trainer')
const vuejsTrainer = require('./vuejs-trainer')
const webpackTrainer = require('./webpack-trainer')

exports.trainers = [
  ...apiTrainer,
  ...designPatternTrainer,
  ...es6Trainer,
  ...javaScriptTrainer,
  ...linuxTrainer,
  ...nginxTrainer,
  ...nodejsTrainer,
  ...performanceTrainer,
  ...rubyTrainer,
  ...vuejsTrainer,
  ...webpackTrainer
]
