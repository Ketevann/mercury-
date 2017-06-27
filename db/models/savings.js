'use strict'

const { STRING, INTEGER, DECIMAL, JSON, TEXT } = require('sequelize')

module.exports = db => db.define('savings', {

    general: {
        type: DECIMAL(10, 2),
        allowNull: false
    },
    education: {
        type: DECIMAL(10, 2),
        allowNull: false
    },
    retirement: {
        type: DECIMAL(10, 2),
        allowNull: false
    },
    vacation: {
        type: DECIMAL(10, 2),
        allowNull: false
    },
    car: {
        type: DECIMAL(10, 2),
        allowNull: false
    },
    house: {
        type: DECIMAL(10, 2),
        allowNull: false
    }
})
Savings.belongsTo(User)