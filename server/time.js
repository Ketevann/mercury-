
module.exports = require('express').Router()
  .get('/timer', function(req, res, next) {
    res.send('In the timer route!!')
  })
