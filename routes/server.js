const router = require('express').Router()

router.get('/server', (req, res) => {
  res.send('server dog!')
})

module.exports = router
