'use strict'
const app = require('APP'), { env } = app

const api = module.exports = require('express').Router()
const plaid = require('plaid')
const envvar = require('envvar')
const PLAID_CLIENT_ID = env.PLAID_CLIENT_ID
const PLAID_SECRET = env.PLAID_SECRET
const PLAID_PUBLIC_KEY = env.PLAID_PUBLIC_KEY
const PLAID_ENV = envvar.string('PLAID_ENV', 'development')
const db = require('../db')
const AccessToken = db.model('accessToken');

api
  .get('/heartbeat', (req, res) => res.send({ ok: true }))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))

  .use('/plaid', require('./plaid'))
  .use('/email', require('./email'))
    .use('/timer', require('./time'))


  .use('/budget', require('./budget'))
  .use('/nodemailer', require('./nodemailer'))

// We store the access_token in memory - in production, store it in a secure
// persistent data store
//const ACCESS_TOKEN = 'access-development-8d91f539-03cc-40dd-8833-cf30e1f23370'


api.get('/bla', (req, res, next) =>{
  console.log("GEEEET")
   var categories
   client.getCategories(function(err, response) {
            // Handle err
              categories = response.categories
res.send({cat:categories})
            })
            console.log('categories********', categories )

})




// No routes matched? 404.
api.use((req, res) => res.status(404).end())

