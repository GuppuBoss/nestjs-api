import { Controller, Get, Post, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { FacebookAuthGuard } from './auth/facebook.auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}


  @UseGuards(LocalAuthGuard)
  @Post('login')
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
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
