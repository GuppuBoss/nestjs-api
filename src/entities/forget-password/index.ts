import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
import config from '../../config';

@Injectable()
export class ForgetPasswordService {
  constructor(
    private userService: UsersService
  ) { }
  async sendConfirmationEmail (email: string, redirectURI: string): Promise<String> {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
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
          redirectURI: redirectURI
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
        <a href = ${config.FORGET_PASSWORD_REDIRECT_URL_BACKEND + token} target = "_blank" > FORGET PASSWORD </a>
        <br/>
      `
      });
      console.log("Message sent: ", info.messageId);
      return "email sent successfully!";
    }
  }
}