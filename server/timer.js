var schedule = require('node-schedule');
var axios = require('axios');
var nodemailer = require('nodemailer');
const db = require('../db')
const AccessToken = db.model('accessToken');


var j = schedule.scheduleJob('30 * * * *', function(){
  console.log('Please work????')
  AccessToken.findAll({}).then((token)=> console.log(token))
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
      subject: 'Hello ✔', // Subject line
      text: 'got bread ?', // plain text body
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

module.exports = j;