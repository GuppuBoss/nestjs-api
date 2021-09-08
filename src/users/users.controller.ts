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
    @Body('email') email: string,
    @Body('redirectURI') redirectURI: string
  ) {
    return this.forgetPassword.sendConfirmationEmail(email, redirectURI);
  }

  @Get('forgetpassword/:token')
  VerifyEmailAndRedirect (
    @Param('token') token: string,
    @Res() res: Response
  ) {
    jwt.verify(token, config.FORGET_PASSWORD_JWT_TOKEN_SECRET, (err, decodedToken) => {
      if (err) throw new UnauthorizedException();
      if(decodedToken.redirectURI){
        res.redirect(`${decodedToken.redirectURI}${token}`);
      }
      else res.redirect(`http://localhost:3000/forgetpassword/${token}`);
    });
  }
  @Post('forgetpass/recovery/:token')
  UpdatePassword (
    @Body() body,
    @Param('token') token: string
  ) {
    !!token && jwt.verify(token, config.FORGET_PASSWORD_JWT_TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        throw new UnauthorizedException();
      }
      else {
        const user = await this.userService.findOneByEmail(decodedToken.email);
        user.password = body.password;
        await user.save()
      }
    });
  }
}