import { Controller, Get, Post, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

}
