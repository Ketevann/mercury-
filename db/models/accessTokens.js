// 'use strict'


const { STRING } = require('sequelize')

module.exports = db => db.define('accessToken', {
  accessToken: {
    type: STRING
  }
})
module.exports.associations = (AccessToken, { User }) => {
  AccessToken.belongsTo(User)
}