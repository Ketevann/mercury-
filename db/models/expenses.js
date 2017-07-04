// 'use strict'

 const { STRING, INTEGER, DECIMAL, JSON, TEXT, ENUM } = require('sequelize')

module.exports = db => db.define('expense', {

  category: {
    type: ENUM('food', 'bills', 'transporation', 'healtchare','education' ,'emergencies')
  },
  food: {
    type: DECIMAL(10, 2)
  },
  bills: {
    type: DECIMAL(10, 2)
  },
  healthcare: {
    type: DECIMAL(10, 2)
  },
  transportation: {
    type: DECIMAL(10, 2)
  },
  education: {
    type: DECIMAL(10, 2)
  },
  emergencies: {
    type: DECIMAL(10, 2)
  },
  entertainment: {
    type: DECIMAL(10, 2)
  },
  other: {
    type: DECIMAL(10, 2)
  }


})
module.exports.associations = (Expense, { User }) => {
 // Expense.belongsTo(User)
}

