const transporter = require("../nodemailer");
require('dotenv').config();

const mailer = (req, res, next)=>{
  var mailOptions = {
    from: process.env.EMAIL,
    to: "faithodesola@gmail.com",
    subject: 'Pending Request from the Asset Inventory System',
    text: 'A new Request has been sent',
    html: '<p>Click <a href="http://localhost:3000/requests">here</a> to view all pending requests</p>'
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