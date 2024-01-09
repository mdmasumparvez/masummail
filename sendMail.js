const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: 'driveoneforcad@gmail.com',
      pass: process.env.USERPASSO + ' ' + process.env.USERPASST + ' ' + process.env.USERPASSTR  + ' ' + process.env.USERPASSFR
    },
  });
  const SENDMAIL = async (mailDetails, callback) => {
    try {
      const info = await transporter.sendMail(mailDetails)
      callback(info);
    } catch (error) {
      console.log(error);
    } 
  };


module.exports = SENDMAIL
