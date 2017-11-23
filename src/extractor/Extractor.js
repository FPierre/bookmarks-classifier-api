const cheerio = require('cheerio')
const franc = require('franc-min')
const fse = require('fs-extra')

const throwMissing = param => {
  throw new TypeError(`Missing parameter ${param}`)
}

module.exports = class Extractor {
  constructor (tags = throwMissing('tags'), htmlFilePath = throwMissing('htmlFilePath')) {
    if (!tags.length) {
      throw new TypeError('Tags parameter is empty')
    }

    this.tags = tags
    this.htmlFilePath = htmlFilePath
    this.taggedBookmarks = []
  }

  async writeJSON (jsonFilePath) {
    const taggedBookmarks = await this._process()
    this.taggedBookmarks = taggedBookmarks

    await fse.outputJson(jsonFilePath, this.taggedBookmarks)
  }

  async _readBookmarksFile () {
    try {
      return await fse.readFile(this.htmlFilePath)
    } catch (e) {
      console.log(e.stack)
      process.exit(1)
    }
  }

  async _process () {
    const $ = cheerio.load(await this._readBookmarksFile())
    let promises = []

    return new Promise((resolve, reject) => {
      $('dt a').each((i, elem) => {
        const bookmarkTags = $(elem).attr('tags').split(',')

        if (!bookmarkTags.length) {
          reject(new Error('bookmarkTags is empty'))
        }

        for (const tag of bookmarkTags) {
          if (!this.tags.includes(tag)) {
            continue
          }

          const text = $(elem).text()
          const lang = franc(text) === 'fr' ? 'fr' : 'en'

          promises.push({ tag, lang, text })
        }
      })

      resolve(promises)
    })
  }
}
