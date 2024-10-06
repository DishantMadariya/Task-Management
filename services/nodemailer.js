const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME, // Your Gmail address
        pass: process.env.EMAIL_PASSWORD, // Your Gmail password or app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM, // Your email
      to: email, // The recipient's email
      subject: subject,
      text: message, // The message body
    };

    await transporter.sendMail(mailOptions);
    console.log('OTP sent to email');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
