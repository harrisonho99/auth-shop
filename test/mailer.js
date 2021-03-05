const nodemailer = require('nodemailer');
require('dotenv').config();
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'socrom001@gmail.com',
    pass: process.env.APP_PASS,
  },
});

var mailOptions = {
  from: 'socrom001@gmail.com',
  to: 'huynguyen.rido@gmail.com',
  subject: 'Sending Email using Node.js',
  html: '<h1>Hello Huy!</h1>',
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
