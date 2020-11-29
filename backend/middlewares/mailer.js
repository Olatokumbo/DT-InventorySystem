const transporter = require("../nodemailer");
require('dotenv').config();

const mailer = (req, res, next)=>{
  var mailOptions = {
    from: process.env.EMAIL,
    to: "faithodesola@gmail.com",
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      next();
    }
  });
}

module.exports = mailer; 