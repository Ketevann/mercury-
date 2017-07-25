'use strict'
const api = module.exports = require('express').Router()

api
    .get('/heartbeat', (req, res) => res.send({ ok: true }))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))



  .use('/plaid', require('./plaid'))
  .use('/email', require('./email'))
   .use('/timer', require('./time'))
  .use('/budget', require('./budget'))

// We store the access_token in memory - in production, store it in a secure
// persistent data store
//const ACCESS_TOKEN = 'access-development-8d91f539-03cc-40dd-8833-cf30e1f23370'



api.use((req, res) => res.status(404).end())

