// 'use strict'

// const { STRING, INTEGER, DECIMAL, JSON, TEXT } = require('sequelize')

<<<<<<< HEAD
const { STRING, INTEGER, DECIMAL, JSON, TEXT, ENUM } = require('sequelize')
=======
>>>>>>> 77404c3a44ed705cf33803f60fedcc1e738d73d5

module.exports = db => db.define('savings', {
    category: {
        type: ENUM( 'College Fund', 'Emergency', 'Retirement', 'Vacation', 'Car', 'House'),
        allowNull: false
    },
    amount: {
        type: DECIMAL(10, 2),
        allowNull: false
    }
})
module.exports.associations = (Savings, { User }) => {
    Savings.belongsTo(User)
}
