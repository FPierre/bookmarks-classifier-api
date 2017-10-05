const tags = require('../tags')
const Extractor = require('./extractor')

const extractor = new Extractor(tags)

extractor.process()
extractor.writeJSON()
