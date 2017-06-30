// 'use strict'

 const { STRING, INTEGER, DECIMAL, JSON, TEXT, ENUM } = require('sequelize')

module.exports = db => db.define('expense', {

  childcare: {
    type: DECIMAL(10, 2)
  },
  debt: {
    type: DECIMAL(10, 2)
  },
  education: {
    type: DECIMAL(10, 2)
  },
  emergencies: {
    type: DECIMAL(10, 2)
  },
  events: {
    type: DECIMAL(10, 2)
  },
  food: {
    type: DECIMAL(10, 2)
  },
  healthcare: {
    type: DECIMAL(10, 2)
  },
  insurance: {
    type: DECIMAL(10, 2)
  },
  transportation: {
    type: DECIMAL(10, 2)
  },
  miscelaneous: {
    type: DECIMAL(10, 2)
  },
  entertainment: {
    type: DECIMAL(10, 2)
  },



})
module.exports.associations = (Expense, { User }) => {
    Expense.belongsTo(User)
}

