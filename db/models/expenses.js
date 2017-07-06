// 'use strict'

 const { STRING, INTEGER, DECIMAL, JSON, TEXT, ENUM } = require('sequelize')

module.exports = db => db.define('expense', {


  food: {
    type: DECIMAL(10, 2),
    defaultValue :0
  },
  bills: {
    type: DECIMAL(10, 2),
    defaultValue: 0

  },
  healthcare: {
    type: DECIMAL(10, 2),
    defaultValue: 0
  },
  transportation: {
    type: DECIMAL(10, 2),
    defaultValue: 0
  },
  education: {
    type: DECIMAL(10, 2),
    defaultValue: 0
  },
  emergencies: {
    type: DECIMAL(10, 2),
    defaultValue: 0
  },
  entertainment: {
    type: DECIMAL(10, 2),
    defaultValue: 0
  },
  other: {
    type: DECIMAL(10, 2),
    defaultValue: 0
  }


})
module.exports.associations = (Expense, { User }) => {
 // Expense.belongsTo(User)
}

