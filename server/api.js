'use strict'

const api = module.exports = require('express').Router()
const plaid = require('plaid')
const envvar = require('envvar')
const PLAID_CLIENT_ID = require('../newCredentials').PLAID_CLIENT_ID
const PLAID_SECRET = require('../newCredentials').PLAID_SECRET
const PLAID_PUBLIC_KEY = require('../newCredentials').PLAID_PUBLIC_KEY
const PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox')
const ACCESS_TOKEN = 'access-sandbox-69aa126f-6075-4325-8afd-fac600c79b5e' // sandbox
const db = require('../db')
const AccessToken = db.model('accessToken');

var x = new Date();
var z = x.toString().split(' ');
var month = (x.getMonth() < 10) ? '0' + x.getMonth() : x.getMonth()
var currentMonth = z[3] + '-' + month + '-' + (+z[2] - 1);
var prevmonth = (month === 1) ? 12 : month - 1;
prevmonth = (prevmonth < 10) ? '0' + prevmonth : prevmonth;
var prevMonth = z[3] + '-' + prevmonth + '-' + (+z[2] - 1);

api
  .get('/heartbeat', (req, res) => res.send({ ok: true }))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/budget', require('./budget'))
  .use('/nodemailer', require('./nodemailer'))

// We store the access_token in memory - in production, store it in a secure
// persistent data store
// const ACCESS_TOKEN = null

// Initialize the Plaid client
const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
)

api.get('/', function (request, response, next) {
  response.render('index.ejs', {
    PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
    PLAID_ENV: PLAID_ENV,
  })
})

api.post('/get_access_token', function (request, response, next) {
  const PUBLIC_TOKEN = request.body.public_token
  console.log('PUBLIC', PUBLIC_TOKEN)
  client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
    console.log('TOKENRESPONSE', tokenResponse)
    if (error != null) {
      console.log('ERROR', error)
      let msg = 'Could not exchange public_token!'
      console.log(msg + '\n' + error)
      return response.json({
        error: msg
      })
    }
    const ACCESS_TOKEN = tokenResponse.access_token
    const ITEM_ID = tokenResponse.item_id
    console.log('Access Token: ' + ACCESS_TOKEN)
    console.log('Item ID: ' + ITEM_ID)
    response.send(ACCESS_TOKEN)
    /*response.json({
      'error': false
    })*/
  })
})

api.get('/accounts', function (request, response, next) {
  // Retrieve high-level account information and account and routing numbers
  // for each account associated with the Item.
  //let ACCESS_TOKEN = ''
  console.log('ACCESS', ACCESS_TOKEN)
  client.getAuth(ACCESS_TOKEN, function (error, authResponse) {
    console.log('authResponse', authResponse)
    if (error != null) {
      let msg = 'Unable to pull accounts from the Plaid API.'
      // console.log("authResponse", authResponse)
      console.log(msg + '\n' + error)
      return response.json({
        error: msg
      })
    }

    console.log(authResponse.accounts)
    response.json({
      error: false,
      accounts: authResponse.accounts,
      numbers: authResponse.numbers,
    })
  })
})

api.post('/item', function (request, response, next) {
  // Pull the Item - this includes information about available products,
  // billed products, webhook information, and more.
  let ACCESS_TOKEN = 'access-sandbox-69aa126f-6075-4325-8afd-fac600c79b5e'
  client.getItem(ACCESS_TOKEN, function (error, itemResponse) {
    if (error != null) {
      console.log(JSON.stringify(error))
      return response.json({
        error: error
      })
    }

    // Also pull information about the institution
    client.getInstitutionById(itemResponse.item.institution_id, function (err, instRes) {
      if (err != null) {
        let msg = 'Unable to pull institution information from the Plaid API.'
        console.log(msg + '\n' + error)
        return response.json({
          error: msg
        })
      } else {
        response.json({
          item: itemResponse.item,
          institution: instRes.institution,
        })
      }
    })
  })
})

api.post('/transactions', function (request, response, next) {
  // Pull transactions for the Item for the last 30 days
  let ACCESS_TOKEN = 'access-sandbox-69aa126f-6075-4325-8afd-fac600c79b5e'
  // let startDate = moment().subtract(30, 'days').format('YYYY-MM-DD')

  let startDate = '2017-06-01'

  //console.log('DATES', prevMonth, currentMonth)
  // let endDate = moment().format('YYYY-MM-DD')
  //let endDate = currentMonth
  let endDate = '2017-06-30'

  client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
    count: 250,
    offset: 0,
  }, function (error, transactionsResponse) {
    if (error != null) {
      console.log(JSON.stringify(error))
      return response.json({
        error: error
      })
    }
    console.log('pulled ' + transactionsResponse.transactions.length + ' transactions')
    response.json(transactionsResponse)
  })
})

api.post('/putTokenInDB', (req, res, next) => {
  console.log('IN API')
  console.log('REQ BODY AT', typeof req.body.accessToken)
  var user = req.body.user;
  AccessToken.create(
    {

        accessToken: req.body.accessToken,
        user_id: user.id

    })
    .then((aT) => {
      console.log("AT",aT);
      res.send(aT);
    })
})

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
