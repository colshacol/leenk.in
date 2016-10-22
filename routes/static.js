const router = require('express').Router()

router.get('/server', (req, res, next) => {
  const regExMatch = new RegEx(/((scripts|styles|images|assets)\/\w*\.(svg|js|html|css|png|jpg|jpeg))/)
  if (req.url.match(regExMatch)) {
    const match = req.url.match(regExMatch)[0]
    res.sendFile(`public/${match}`, {root: './'})
    return;
  }

  next()
})

module.exports = router
