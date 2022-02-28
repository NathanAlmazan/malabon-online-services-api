import nodemailer from 'nodemailer';
import hbs from 'handlebars';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const mail = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSWORD
    }
  });

const compile = async (username: string, link: string) : Promise<string> => {
    const filePath = path.join(__dirname, 'template.hbs');

    const html = fs.readFileSync(filePath, 'utf-8');
    return hbs.compile(html)({ userName: username, confirmationLink: link });
 
}

async function sendEmail (receiver:string, subject:string, username: string, link: string) : Promise<boolean> {
    const htmlContent = await compile(username, link); // create html body

    const mailOptions = {
        from: 'Malabon Online Services',
        to: receiver,
        subject: subject,
        html: htmlContent
    };

    //send email
    await mail.sendMail(mailOptions)
    return true;
};

export default sendEmail;

