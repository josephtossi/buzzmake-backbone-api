const nodemailer = require('nodemailer');
const fs = require('fs');
const { promisify } = require('util');

// Promisify the fs.readFile function
const readFileAsync = promisify(fs.readFile);

// todo: select a transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: {
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
});

const sendEmail = async (mailOptions) => {
    try {
        const htmlTemplate = await readFileAsync('email_templates/signup_template.html', 'utf-8');
        const imageAttachment = await readFileAsync('email_templates/signup.jpg');
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: mailOptions.to,
            subject: mailOptions.subject,
            html: htmlTemplate,
            attachments: [{
                filename: 'image.png',
                content: imageAttachment,
                encoding: 'base64',
                cid: 'uniqueImageCID',
            }],
        });

        console.log('Email sent:', info.messageId);
    } catch (error) {
        console.log(`Error : ${error}`);
        throw error;
    }
};

module.exports.sendEmail = sendEmail;