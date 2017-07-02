var schedule = require('node-schedule');
var axios = require('axios');
var nodemailer = require('nodemailer');
const db = require('../db')
const AccessToken = db.model('accessToken');
const plaid = require('plaid')
const envvar = require('envvar')
const PLAID_CLIENT_ID = require('../newCredentials').PLAID_CLIENT_ID
const PLAID_SECRET = require('../newCredentials').PLAID_SECRET
const PLAID_PUBLIC_KEY = require('../newCredentials').PLAID_PUBLIC_KEY
const PLAID_ENV = envvar.string('PLAID_ENV', 'sandbox')
const client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
)

var j = schedule.scheduleJob('33 * * * *', function(){
  console.log('Please work????')
  console.log('client', client)
  AccessToken.findAll({}).then((token)=> {
  	console.log('token?',token[1])
  	client.getTransactions(token[1].accessToken, '2017-06-01','2017-06-30' , {
    count: 250,
    offset: 0,
  }, function (error, transactionsResponse) {
    if (error != null) {
      console.log(JSON.stringify(error))
      return response.json({
        error: error
      })
    }
    console.log('Transactions:',transactionsResponse)
    console.log('pulled ' + transactionsResponse.transactions.length + ' transactions')
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
        user: 'clairepfis@gmail.com',
        pass: 'simonrubinstein'
      }
    })

    // setup email data with unicode symbols
    // let mailOptions = {
    //   from: '"Fred Foo bread junior 👻" <*****@gmail.com>', // sender address
    //   to: 'ninbaratwli@gmail.com', // list of receivers
    //   subject: 'Hello ✔', // Subject line
    //   text: 'got bread ?', // plain text body
    //   html: '<b>got bread  ?</b>' // html body
    // }


    var mailOptions = {
        from: '"Fred Foo bread junior 👻" <clairepfis@gmail.com>', // sender address
      to: 'howebs@yahoo.com', // list of receivers
      subject: `${transactionsResponse.transactions[0].name}`, // Subject line
      text: `${transactionsResponse.transactions.length}`, // plain text body
    html: ' <img src="lets"/>',
    attachments: [{
        filename: 'image.png',
        path: 'http://cutepuppyclub.com/wp-content/uploads/2015/05/White-Cute-Puppy-.jpg',
        cid: 'lets' //same cid value as in the html img src
    }]
}
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      /*req.end()
      transporter.close()
      res.send('WHYYYYYY')*/
    })
})
  })
  })
    

module.exports = j;