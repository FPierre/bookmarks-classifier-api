const fs = require('fs')
const cheerio = require('cheerio')
const franc = require('franc-min')

class Extractor {
  constructor (tags) {
    this.tags = tags
    this.htmlFilePath = './extractor/raindrop.io.html'
    this.jsonFilePath = './extractor/tagged-bookmarks.json'
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
          const lang = franc(text) === 'fra' ? 'fra' : 'eng'

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

module.exports = Extractor

/*
const tags = [
  'API',
  'Blockchain',
  'Docker',
  'ES6',
  'JavaScript',
  'Go',
  'Linux',
  'Nginx',
  'Node.js',
  'Performance',
  'Ruby on Rails',
  'Vue.js',
  'Webpack'
]
const taggedBookmarks = []

try {
  const content = fs.readFileSync('./extractor/raindrop.io.html', 'utf8')
  const $ = cheerio.load(content)

  $('dt a').each((i, elem) => {
    const bookmarkTags = $(elem).attr('tags')

    if (bookmarkTags) {
      const bookmarkTagsArray = bookmarkTags.split(',')

      for (const bookmarkTag of bookmarkTagsArray) {
        if (tags.includes(bookmarkTag)) {
          const text = $(elem).text()
          const lang = franc(text) === 'fra' ? 'fra' : 'eng'

          taggedBookmarks.push({
            tag: bookmarkTag,
            lang: lang,
            text: text
          })
        }
      }
    }
  })
} catch (e) {
  console.log('Error:', e.stack)
}

fs.writeFile('./extractor/tagged-bookmarks.json', JSON.stringify(taggedBookmarks, undefined, 2), err => {
  if (err) {
    return console.log(err)
  }

  console.log('The file was saved!')
})
*/
