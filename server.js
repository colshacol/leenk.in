const
  express = require('express'),
  compression = require('compression'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  port = process.env.PORT || 8099,
  app = express()

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

app.use('*', (req, res) => {
  res.sendFile('index.html', { root: './' })
})

app.listen(port, () => {
  console.log(`\nListening on http://localhost:${port}.\n`)
})
