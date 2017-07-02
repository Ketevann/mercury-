var schedule = require('node-schedule');
var axios = require('axios');
var nodemailer = require('nodemailer');
const db = require('../db')
const AccessToken = db.model('accessToken');
const User = db.model('users');
const plaid = require('plaid')
const envvar = require('envvar')
var giphy = require('giphy-api')();
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

var j = schedule.scheduleJob('56 * * * *', function(){
  console.log('Please work????')
  console.log('client', client)
  AccessToken.findAll({include:[User]}).then((token)=> {
  	console.log('token?',token[0])
  	client.getTransactions(token[0].accessToken, '2017-06-01','2017-06-30' , {
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
    var total = transactionsResponse.transactions.reduce((total,val)=>{
    	if(val.name===token[0].user.thing)
    		return total+val.amount;
    	else return total
    },0)
    console.log(total,typeof total);
    console.log(total, token[0].user.thing )
    var message = (total<token[0].user.amount) ? `${token[0].user.name} was successful!` : `${token[0].user.name} was unsuccessful!`
    var second = `${token[0].user.name} spent ${total} on ${token[0].user.thing} - goal was ${token[0].user.amount}` 
    var fin = message + " "+second;
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
        user: 'clairepfis@gmail.com',
        pass: '********'
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
    console.log('to pass:',token[0].user.thing )
    giphy.search(token[0].user.thing) // 'flamingo is a keyword to search for
		.then(function (data) {
    // Res contains gif data!
    console.log('found a gif!!!')
    console.log('HAS A THING??',data.data[0])
    var mailOptions = {
        from: '"Mercury" <clairepfis@gmail.com>', // sender address
      to: 'clairepfis@gmail.com', // list of receivers
      subject: fin, // Subject line
      text: 'fin', // plain text body
    html: `<${fin}img src="lets"/>`,
    attachments: [{
        filename: 'image.gif',
        path: data.data[0].images.downsized.url,
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
    }).catch((error)=>console.log(error))
})
  })
  })
    

module.exports = j;