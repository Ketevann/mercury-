'use strict'
const db = require('APP/db')
const Expenses = db.model('expense')
const User = db.model('users')


// need to add FindUser in case user exists
module.exports = require('express').Router()
.post('/', (req, res, next) => {
    //if (req.user.role === 'admin') {

       Expenses.create(req.body)
      .then(expenses => {
        User.findOne({where:{
        id: req.user.id}
      })
        .then(user =>{
           user.setExpense(expenses.id)
          .then( expenses =>{
        res.send(expenses)
      })
        })


      })

      .catch(next)
    //}
  })
.get('/', (req, res, next) => {
  if (req.user) {
  return User.findOne({
    where: { id: req.user.id },
    include: [Expenses]
  })

  .then(budget => {
    if (budget === null) res.end()
      else{
        console.log("budger,", budget)
        res.status(200).send(budget.expense)
      }
    })

  .catch(next)
}
else res.end()
})
