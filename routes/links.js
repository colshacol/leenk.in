const
  router = require('express').Router(),
  mongo = require('mongojs'),
  axios = require('axios'),
  fns = require('../src/comps/functions')

const db = mongo('leenkin', ['links'])

router // Create a new shortlink.
  .post('/new', (req, res, next) => {
    const url = req.body.url
    const generateUniqueLinkCode = new Promise((resolve, reject) => {
      const
        chars = 'abcdefghijklmnopqrstuvwxyz',
        numbers = '0123456789',
        codeArray = []

      for (let i of Array(5)) {
        codeArray.push(
          (Math.floor(Math.random() * 2) === 0)
            ? chars.charAt(Math.floor(Math.random() * chars.length))
            : numbers.charAt(Math.floor(Math.random() * numbers.length))
        )
      }

      const linkCode = codeArray.join('')
      db.links.find({ linkCode }, (err, docs) => {
        if (err) reject(err)
        else if (docs.length) return generateUniqueLinkCode()
        else resolve(linkCode)
      })
    })

    generateUniqueLinkCode
      .then((linkCode) => {
        res.send(linkCode)
        saveNewShortlinkInDb(linkCode, url)
      })
  })

module.exports = router

function saveNewShortlinkInDb(linkCode, url) {
  db.links.save({
    linkCode,
    url,
    views: 0
  })
}
