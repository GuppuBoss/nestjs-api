import { Controller, Get, Post, UseGuards, Request, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service'
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { FacebookAuthGuard } from '../guards/facebook.auth.guard';
import { GoogleAuthGuard } from 'src/guards/google.auth.guard';
import { UsersService } from 'src/users/users.service';
import User from 'src/users/dto/createUser.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}


  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  async getHello(@Request() req): Promise<string> {
    return req.user;
  }
  
  @UseGuards(FacebookAuthGuard)
  @Get('/facebook')
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("/facebook/redirect")
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@Request() req): Promise<any> {
    return this.authService.facebookLogin(req);
}

  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) { }

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req)
  }
  @Post('/signup')
  async signupUser(@Body() body: User): Promise<boolean> {
    return this.userService.createUser(body);
  }

}