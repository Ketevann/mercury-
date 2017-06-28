'use strict'

const { STRING, INTEGER, DECIMAL, JSON, TEXT, ENUM } = require('sequelize')

module.exports = db => db.define('debt', {
    category: {
        type: ENUM('Credit Card', 'Student Loans', 'Medical', 'Car Loan', 'Mortgage'),
        allowNull: false
    },
    amount: {
        type: DECIMAL(10, 2),
        allowNull: false
    }
})
module.exports.associations = (Debt, { User }) => {
    Debt.belongsTo(User)
}