const fs = require('fs')
const cheerio = require('cheerio')
const franc = require('franc-min')

module.exports = class Extractor {
  constructor (tags) {
    this.tags = tags
    this.htmlFilePath = './src/extractor/raindrop.io.html'
    this.jsonFilePath = './src/extractor/tagged-bookmarks.json'
    this.taggedBookmarks = []
  }

  process () {
    const $ = cheerio.load(this.readHTML())

    $('dt a').each((i, elem) => {
      const bookmarkTags = $(elem).attr('tags').split(',')

      if (bookmarkTags.length) {
        for (const tag of bookmarkTags) {
          if (!this.tags.includes(tag)) {
            continue
          }

          const text = $(elem).text()
          const lang = franc(text) === 'fr' ? 'fr' : 'en'

          this.taggedBookmarks.push({ tag, lang, text })
        }
      }
    })
  }

  readHTML () {
    try {
      return fs.readFileSync(this.htmlFilePath, 'utf8')
    } catch (e) {
      console.log(e.stack)
      process.exit(1)
    }
  }

  writeJSON () {
    const bookmarks = JSON.stringify(this.taggedBookmarks, undefined, 2)

    fs.writeFile(this.jsonFilePath, bookmarks, err => {
      if (err) {
        return console.log(err)
      }

      console.log('The file was saved!')
    })
  }
}
