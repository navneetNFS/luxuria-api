const mailer = require('nodemailer');


module.exports = (email_address,subject,mail_html) => {
    let transporter = mailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.FROM_EMAIL,
            pass: process.env.FROM_EMAIL_PASSWORD
        }
    });
    let mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email_address,
        subject: subject,
        html: mail_html
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Email sent:" + info.response)
        }
    })
}
