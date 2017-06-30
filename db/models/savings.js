// 'use strict'

// const { STRING, INTEGER, DECIMAL, JSON, TEXT } = require('sequelize')


module.exports = db => db.define('savings', {
    category: {
        type: ENUM(, 'College Fund', 'Emergency', 'Retirement', 'Vacation', 'Car', 'House'),
        allowNull: false
    },
    amount: {
        type: DECIMAL(10, 2),
        allowNull: false
    }
})
// module.exports.associations = (Savings, { User }) => {
//     Savings.belongsTo(User)
// }
