const { tokenize } = require('./utils')

module.exports = class Bayes {
  constructor () {
    this.tags = []
    this.wordsByTag = {}
    this.textCountByTag = {}
    this.wordsCount = {}
    this.scores = {}
  }

  train (text, tag) {
    this.storeTag(tag)

    const words = tokenize(text)

    for (const word of words) {
      this.storeWordByTag(word, tag)
      this.storeWordsCount(word)
    }

    this.storeTextCountByTag(tag)
  }

  guess (text) {
    const words = tokenize(text)
    const textsCount = {}
    const textsInverseCount = {}
    const scores = {}
    const tagProbability = {}
    let totalDocCount = 0

    for (const tag of this.tags) {
      textsCount[tag] = this.textCountByTag[tag]
      textsInverseCount[tag] = this.textInverseCount(tag)
      totalDocCount += textsCount[tag]

      let logSum = 0

      tagProbability[tag] = textsCount[tag] / totalDocCount

      for (const word of words) {
        const _stemTotalCount = this.stemTotalCount(word)
        let wordicity = null

        if (_stemTotalCount === 0) {
          continue
        } else {
          let tmp = this.wordsByTag[tag][word] || 0
          const wordProbability = tmp / textsCount[tag]
          const wordInverseProbability = this.wordInverseTagCount(word, tag) / textsInverseCount[tag]

          wordicity = wordProbability / (wordProbability + wordInverseProbability)
          wordicity = ((1 * 0.5) + (_stemTotalCount * wordicity)) / (1 + _stemTotalCount)

          if (wordicity === 0) {
            wordicity = 0.01
          } else if (wordicity === 1) {
            wordicity = 0.99
          }
        }

        logSum += (Math.log(1 - wordicity) - Math.log(wordicity))
      }

      scores[tag] = 1 / (1 + Math.exp(logSum))
    }

    this.scores = scores

    return this.scores
  }

  resetTraining () {
    this.tags = []
    this.wordsByTag = {}
    this.textCountByTag = {}
  }

  winner () {
    let bestScore = 0
    let bestTag = null

    for (const tag in this.scores) {
      if (this.scores[tag] > bestScore) {
        bestScore = this.scores[tag]
        bestTag = tag
      }
    }

    return { tag: bestTag, score: bestScore }
  }

  storeTag (tag) {
    if (this.tags.indexOf(tag) === -1) {
      this.tags.push(tag)
    }
  }

  // Number of times a word is present for a given tag
  storeWordByTag (word, tag) {
    // If tag is not already present in root object
    if (!this.wordsByTag[tag]) {
      this.wordsByTag[tag] = {}
    }

    // If word is not already present in tag object
    if (!this.wordsByTag[tag][word]) {
      this.wordsByTag[tag][word] = 0
    }

    this.wordsByTag[tag][word] = ++this.wordsByTag[tag][word]
  }

  storeWordsCount (word) {
    if (!this.wordsCount[word]) {
      this.wordsCount[word] = 0
    }

    this.wordsCount[word]++
  }

  storeTextCountByTag (tag) {
    let textCountByTag = this.textCountByTag

    if (!textCountByTag[tag]) {
      textCountByTag[tag] = 0
    }

    this.textCountByTag[tag] = ++textCountByTag[tag]
  }

  textInverseCount (tag) {
    return this.tags.reduce((memo, _tag) => {
      if (_tag === tag) {
        return memo
      }

      return memo += parseInt(this.textCount(tag))
    }, 0)
  }

  wordInverseTagCount (word, tag) {
    return this.tags.reduce((memo, _tag) => {
      if (_tag === tag) {
        return memo
      }

      return memo += this.wordsByTag[_tag][word] || 0
    }, 0)
  }

  textCount (tag) {
    return this.textCountByTag[tag] || 0
  }

  stemTotalCount (word) {
    return this.wordsCount[word] || 0
  }
}
