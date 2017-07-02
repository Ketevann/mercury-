'use strict'

var xoauth2 = require('xoauth2');
var nodemailer = require('nodemailer');
var smtp = require('nodemailer-smtp-transport');
// const giffy = require('../giffy.js')
var giphy = require('giphy-api')();  //using secrets does not work - i have secrets on my laptop

// need to add FindUser in case user exists
module.exports = require('express').Router()
  .post('/', (req, res, next) =>{
        console.log("i!!n nodemailer!!!!!!*************")
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
        user: 'myexampleapp7@gmail.com',
        pass: 'nodemailer'
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
        from: '"Fred Foo bread junior 👻" <myexampleapp7@gmail.com>', // sender address
      to: 'ketevan.tsin@gmail.com', // list of receivers
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

//gipgy

.get('/search', (req,res, next) => {

 console.log(giffy, "apikeeyy")

giphy.search('kardashian') // 'flamingo is a keyword to search for
.then(function (data) {
    // Res contains gif data!
    console.log("hitting", data)
    res.send(data)
})
})
