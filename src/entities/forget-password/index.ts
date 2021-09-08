import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
import config from '../../config';

@Injectable()
export class ForgetPasswordService {
  async sendConfirmationEmail (email: string): Promise<void> {
    let transport = nodemailer.createTransport({
      host: config.SENDING_EMAIL_HOST,
      port: config.SENDING_EMAIL_PORT,
      auth: {
        user: config.SENDING_EMAIL_USER,
        pass: config.SENDING_EMAIL_PASS
      }
    });
    const token = jwt.sign(
      {
        email: email,
      },
      config.FORGET_PASSWORD_JWT_TOKEN_SECRET,
      {
        expiresIn: '60m',
      }
    );
    let info = await transport.sendMail({
      from: config.SENDING_EMAIL,
      to: email,
      subject: "Forget Password",
      html: `
        <b>click on the following link to proceed</b>
        <br/>
        <p> This link will expires in <b> one minute </b> </p>
        <br/>
        <a href = ${config.FORGET_PASSWORD_REDIRECT_URL + token} target = "_blank" > FORGET PASSWORD </a>
        <br/>
      `
    });
    console.log("Message sent: ", info.messageId);
  }
}