const path = require('path')
const test = require('ava')
const fse = require('fs-extra')

const Extractor = require('../../src/extractor/Extractor.js')

test('success', async t => {
  const tags = ['Node.js']
  const bookmarkFilePath = path.resolve(__dirname, '../fixtures/raindrop.io.html')
  const jsonFilePath = path.resolve(__dirname, '../fixtures/tagged-bookmarks.json')

  const extractor = new Extractor(tags, bookmarkFilePath)

  await extractor.writeJSON(jsonFilePath)
  const writtenJSON = await fse.readJSON(jsonFilePath)

  const expectedJSON = [
    {
      'tag': 'Node.js',
      'lang': 'en',
      'text': 'Crystal lang vs NodeJS vs Golang http benchmark'
    },
    {
      'tag': 'Node.js',
      'lang': 'en',
      'text': 'Testing Socket.IO with Mocha, Should.js and Socket.IO Client - Liam Kaufman'
    },
    {
      'tag': 'Node.js',
      'lang': 'en',
      'text': 'Node.js ES2015/ES6, ES2016 and ES2017 support'
    },
    {
      'tag': 'Node.js',
      'lang': 'en',
      'text': 'Basic Server Side Rendering with Vue.js and Express'
    },
    {
      'tag': 'Node.js',
      'lang': 'en',
      'text': 'Integrating Vue.js and Socket.io'
    }
  ]

  t.deepEqual(writtenJSON, expectedJSON)
})
