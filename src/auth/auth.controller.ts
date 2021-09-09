import { Controller, Get, Post, UseGuards, Request, HttpStatus, Body } from '@nestjs/common';
import { AuthService } from './auth.service'
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { FacebookAuthGuard } from '../guards/facebook.auth.guard';
import { GoogleAuthGuard } from 'src/guards/google.auth.guard';
import { UserRecieved } from '../users/dto/createUser.dto'
import { UsersService } from 'src/users/users.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UsersService) { }
  @Post('signup')
  signUp (@Body() body: UserRecieved) {
    return this.userService.signUpUser(body)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login (@Request() req): any {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('login/protected')
  getHello (@Request() req): string {
    return req.user;
  }

  @UseGuards(FacebookAuthGuard)
  @Get('login/facebook')
  async facebookLogin (): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("login/facebook/redirect")
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect (@Request() req): Promise<any> {
    return this.authService.facebookLogin(req);
  }

  @Get('login/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth (@Request() req) { }

  @Get('login/google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect (@Request() req) {
    return this.authService.googleLogin(req)
  }

}