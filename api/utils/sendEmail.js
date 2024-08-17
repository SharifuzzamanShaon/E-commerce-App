const nodemailer = require("nodemailer");
require("dotenv").config()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});
 const sendEmail = async (to, subject, body) => {
    transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: to,
        subject: subject,
        html: body
    });
}
module.exports = sendEmail
/**
 * 
 * 
 * btoy whba cjat quzm

 */