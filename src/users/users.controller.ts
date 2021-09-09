import { UnauthorizedException } from "@nestjs/common";
import { Controller, Get, Param, Body, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { ResetPasswordService } from "src/entities/resetPassword";
import config from "../config";
import { ForgetPasswordService } from "../entities/forgetPassword";
import { UsersService } from "./users.service";
const jwt = require('jsonwebtoken');

@Controller()
export class UserController {
  constructor(
    private forgetPasswordService: ForgetPasswordService,
    private userService: UsersService,
    private resetPasswordService: ResetPasswordService
  ) { }
  @Post('resetpassword')
  async resetPasswordRequest (
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() res: Response,
    @Body('redirectUrl') redirectUrl?: string
  ) {
    const userToken = await this.resetPasswordService.ResetPassword(
      { email, password, redirectUrl }
    );
    if (userToken) {
      console.log('come here!:',userToken)
      res.redirect(`http://localhost:3001/resetpassword/verify/${userToken}`)
    }
  }
  @Get(`resetpassword/verify/:token`)
  resetPasswordRedirect (@Param('token') token: string, @Res() res: Response) {
    jwt.verify(token, config.RESET_PASSWORD_JWT_TOKEN_SECRET, (err, decodedToken) => {
      if (err) throw new Error("Something Went Wrong! ist")
      if (decodedToken) {
        console.log('pass through')
        if (decodedToken.redirectUrl) {
          res.redirect(`${decodedToken.redirectUrl}/${token}`)
        } else {
          res.redirect(`${config.RESET_PASSWORD_REDIRECT_URL_FRONTEND}${token}`)
        }
      }
    })
  }
  @Post(`resetpassword/reset/:token`)
  resetPassword (@Param('token') token: string, @Body('password') password: string) {
    jwt.verify(token, config.RESET_PASSWORD_JWT_TOKEN_SECRET, async (err, decodedToken) => {
      if (err) throw new Error("Something Went Wrong!")
      if (decodedToken) {
        console.log('decodedtoken:',decodedToken,'******************************');
        const user = await this.userService.findOneByEmailAndPassword(
          decodedToken.user.email,
          decodedToken.user.password
        );
        if(user){
          user.password = password;
          await user.save();
          return "password changed successfully!"
        }
      }
    })
  }
  @Post('forgetpassword')
  sendEmail (
    @Body('email') email: string,
    @Body('redirectURI') redirectURI: string
  ) {
    return this.forgetPasswordService.sendConfirmationEmail(email, redirectURI);
  }

  @Get('forgetpassword/:token')
  VerifyEmailAndRedirect (
    @Param('token') token: string,
    @Res() res: Response
  ) {
    jwt.verify(token, config.FORGET_PASSWORD_JWT_TOKEN_SECRET, (err, decodedToken) => {
      if (err) throw new UnauthorizedException();
      if (decodedToken.redirectURI) {
        res.redirect(`${decodedToken.redirectURI}${token}`);
      }
      else res.redirect(`${config.FORGET_PASSWORD_REDIRECT_URL_FRONTEND}${token}`);
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