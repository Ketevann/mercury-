'use strict'

const { STRING, INTEGER, DECIMAL, JSON, TEXT } = require('sequelize')

module.exports = db => db.define('expense', {
    category: {
        type: ENUM('Childcare', 'Debt', 'Education', 'Emergencies', 'Events', 'Food', 'Healthcare', 'Housing', 'Insurance','Stuff You Forgot to Budget For', 'Transportation' ),
        allowNull: false
    },
    amount: {
        type: DECIMAL(10, 2),
        allowNull: false
    },
   
    
})
module.exports.associations = (Expense, { User }) => {
    Expense.belongsTo(User)
}