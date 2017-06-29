// 'use strict'


const { STRING, INTEGER, DECIMAL, JSON, TEXT , ENUM} = require('sequelize')

module.exports = db => db.define('income', {
  category: {
    type: ENUM('Paycheck', 'Bonus', 'Reimbursements', 'Investments', 'Misc.'),
    allowNull: false
  },
  amount: {
    type: DECIMAL(10, 2),
    allowNull: false
  },
})
module.exports.associations = (Income, { User }) => {
  Income.belongsTo(User)
}

