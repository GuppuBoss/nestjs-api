import { UnauthorizedException } from "@nestjs/common";
import { Controller, Get, Param, Body, Post, Res } from "@nestjs/common";
import { Response } from "express";
import config from "../config";
import { ForgetPasswordService } from "../entities/forget-password";
import { UsersService } from "./users.service";
const jwt = require('jsonwebtoken');

@Controller()
export class UserController {
  constructor(
    private forgetPassword: ForgetPasswordService,
    private userService: UsersService
  ) { }
  @Post('forgetpassword')
  sendEmail (
    @Body('email') email: string
  ) {
    return this.forgetPassword.sendConfirmationEmail(email);
  }

  @Get('forgetpassword/:token')
  VerifyEmailAndRedirect (
    @Param('token') token: string,
    @Res() res: Response
  ) {
    jwt.verify(token, config.FORGET_PASSWORD_JWT_TOKEN_SECRET, (err, decodedEmail) => {
      if (err) throw new UnauthorizedException();
      else res.redirect(`${config.FORGET_PASSWORD_REDIRECT_URL}${token}`);
    });
  }
  @Post('forgetpass/recovery/:token')
  UpdatePassword (
    @Body() body,
    @Param('token') token: string
  ) {
    !!token && jwt.verify(token, config.FORGET_PASSWORD_JWT_TOKEN_SECRET, async (err, decodedEmail) => {
      if (err) {
        throw new UnauthorizedException();
      }
      else {
        const user = await this.userService.findOneByEmail(decodedEmail.email);
        user.password = body.password;
        await user.save()
      }
    });
  }
}