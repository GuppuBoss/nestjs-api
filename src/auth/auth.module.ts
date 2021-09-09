import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { FacebookStrategy } from '../strategies/facebook.strategy';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from 'src/strategies/google.strategy';
import { UsersService } from 'src/users/users.service';
@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: `"${process.env.JWT_SECRET}"`,
    signOptions: { expiresIn: '60s' },
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy, FacebookStrategy, GoogleStrategy, UsersService],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}