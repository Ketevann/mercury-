'use strict'
const db = require('APP/db')
const Expenses = db.model('expense')
const User = db.model('users')


// need to add FindUser in case user exists
module.exports = require('express').Router()
.post('/', (req, res, next) => {
    //if (req.user.role === 'admin') {

      return Expenses.create(req.body)
      .then(expenses => {
        expenses.setUser(req.user.id)
        res.send(expenses)
      })
      .catch(next)
    //}
  })
.get('/', (req, res, next) => {
  if (req.user) {
  return Expenses.findOne({
    where: { user_id: req.user.id },

  })

  .then(budget => {
    if (budget === null) res.end()
      else{
        console.log("budger,", budget)
        res.status(200).send(budget)
      }
    })

  .catch(next)
}
else res.end()
})
