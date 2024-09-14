const nodemailer = require("nodemailer")

async function sendMail(recipient, subject, html){
    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true, // true for port 465, false for other ports
        auth: {
            user: "support@dormantrefunds.org",
            pass: "Dormantrefunds@1",
        },
    })

    const info = await transporter.sendMail({
        from: '"Alice" <support@dormantrefunds.org>', // sender address
        to: recipient, // list of receivers
        subject: subject, // Subject line
        //text: "Hello world?", // plain text body
        html: html,
    })

    console.log("after sending mail", info)
}

export default sendMail;
