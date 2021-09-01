import { Controller, Get, Post, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service'
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { FacebookAuthGuard } from '../guards/facebook.auth.guard';
import { GoogleAuthGuard } from 'src/guards/google.auth.guard';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @UseGuards(LocalAuthGuard)
  @Post()
  login(@Request() req): any {
    return this.authService.login(req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req): string {
    return req.user;
  }
  
  @UseGuards(FacebookAuthGuard)
  @Get('facebook')
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("facebook/redirect")
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@Request() req): Promise<any> {
    return this.authService.facebookLogin(req);
}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) { }

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req)
  }

}