const tags = require('../tags')
const Extractor = require('./Extractor')

const extractor = new Extractor(tags)

extractor.process()
extractor.writeJSON()
