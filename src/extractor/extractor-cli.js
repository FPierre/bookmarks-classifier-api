const path = require('path')

const Extractor = require('./Extractor')
const tags = require('../tags')

const bookmarkFilePath = path.resolve(__dirname, './raindrop.io.html')
const jsonFilePath = path.resolve(__dirname, './tagged-bookmarks.json')
const extractor = new Extractor(tags, bookmarkFilePath)

extractor.writeJSON(jsonFilePath).then()
