// 'use strict'

const { STRING } = require('sequelize')

module.exports = db => db.define('accounts', {
  accountId: {type: STRING},
  accountType: {type: STRING}
})
module.exports.associations = (Account, { User, AccessToken }) => {
  Account.belongsTo(User),
  Account.belongsTo(AccessToken)
}