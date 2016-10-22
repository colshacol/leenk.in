const
  router = require('express').Router(),
  mongo = require('mongojs'),
  axios = require('axios')

const
  db = mongo('leenkin', ['links'])

router
  .post('/new', (req, res, next) => {
    const
      url = req.body.url

    generateUniqueLinkCode
      .then((linkCode) => {
        res.send(linkCode)
        createNewDbLink(linkCode, url)
      })
  })

router
  .get('/:linkCode', (req, res, next) => {
    const
      linkCode = req.params.linkCode
    db.links.find({ linkCode }, (err, doc) => {
      if (!doc.length) res.send('invalid linkCode')
      else {
        console.log(doc[0].url);
        axios.get(doc[0].url)
          .then(response => {
            console.log(response.data)
            res.send(response.data)
          }).catch(err => {
            console.log(err)
            res.send('errr')
          })
      }
    })
  })

module.exports = router

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

function createNewDbLink(linkCode, url) {
  db.links.save({
    linkCode,
    url,
    views: 0
  })
}
