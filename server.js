const
  express = require('express'),
  compression = require('compression'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 8099,
  mongo = require('mongojs'),
  app = express()

const
  fns = require('./src/comps/functions')
  db = mongo('leenkin', ['links'])

const
  static = require('./routes/static'),
  links = require('./routes/links')

app.use(
  compression(),
  // logger(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  cookieParser(),
  express.static('public')
)



app.use('/links', links)

app.use('/:linkCode', (req, res, next) => {
  const linkCode = req.params.linkCode
  db.links.find({ linkCode }, (err, doc) => {
    (!doc.length)
      ? res.send('invalid linkCode')
      : res.redirect(fns.verifyValidUrl(doc[0].url))
  })
})

app.use('*', (req, res) => {
  res.sendFile('index.html', { root: './' })
})

app.listen(port, () => {
  console.log(`\nListening on http://localhost:${port}.\n`)
})
