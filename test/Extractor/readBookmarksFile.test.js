const cheerio = require('cheerio')
const path = require('path')
const test = require('ava')

const Extractor = require('../../src/extractor/Extractor.js')

test('success', async t => {
  const tags = ['Node.js']
  const bookmarkFilePath = path.resolve(__dirname, '../fixtures/raindrop.io.html')

  const extractor = new Extractor(tags, bookmarkFilePath)

  const html = await extractor._readBookmarksFile()
  const $ = cheerio.load(html)

  t.pass($('title').text(), 'Raindrop.io Bookmarks')
})
