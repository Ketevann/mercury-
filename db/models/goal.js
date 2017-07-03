// 'use strict'

 const { STRING, INTEGER, DECIMAL, JSON, TEXT, ENUM } = require('sequelize')

module.exports = db => db.define('goal', {
  description: {
      type: Sequelize.STRING,
      allowNull: true
  },
   importance:{
      type: Sequelize.STRING,
      allowNull: true
  },
})
module.exports.associations = (Goal, { User }) => {
    Goal.belongsTo(User)
}