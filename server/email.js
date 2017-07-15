
'use strict'

module.exports = require('express').Router()

  .put('/budgetEmail', (req, res, next) => {
    var user = req.user
    user.update({
      budgetUpdates: req.body.budgetUpdates
    })
      .then((updated) => {
        res.send(updated)
      })
  })

  .put('/prodEmail', (req, res, next) => {
    var user = req.user
    user.update({
      prodUpdates: req.body.prodUpdates
    })
      .then((updated) => {
        res.send(updated)
      })
  })

  .put('/addEmail', (req, res, next) => {
    var user = req.user
    user.update({
      emails: req.body.email
    })
      .then((updated) => {
        res.send(updated)
      })
  })
  .put('/removeEmail', (req, res, next) => {
    var user = req.user
    var index = user.emails.indexOf(req.body.email)
    var newemails = user.emails.slice();
    newemails.splice(index, 1);
    user.update({
      emails: newemails
    })
      .then((updated) => {
        console.log('UPDATED', updated)
        res.send(updated)
      })
  })
