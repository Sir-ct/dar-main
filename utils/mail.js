const nodemailer = require("nodemailer")

async function sendMail(recipient, subject, html){
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: "support@dormantrefunds.org",
            pass: process.env.MAIL_PASS,
        },
    })

    const info = await transporter.sendMail({
        from: '"Alice" <support@dormantrefunds.org>', // sender address
        to: recipient, // list of receivers
        subject: subject, // Subject line
        //text: text, // plain text body
        html: html,
    })

    console.log("after sending mail", info)
}

module.exports = {sendMail};
