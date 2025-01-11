// importing the nodemailer package and .env configurations
const nodemailer = require("nodemailer");
require("dotenv").config();

// exporting mailer as an async function accepting email, title and body as the function parameters
exports.mailer = async (email, title, body) => {
    try {
        // creating a transporter object for sending emails as per the standard nodemailer syntax
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
        });

        // emailing info
        let info = await transporter.sendMail({
            from: "Indo-Swiss Training Centre",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        });

        return info;
    } catch (error) {
        console.log("ERROR IN SENDING EMAIL");
        console.log(error);
        return;
    }
}

