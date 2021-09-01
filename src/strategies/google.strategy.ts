import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private userService: UsersService) {
        super({
            clientID: '701053501997-9ji4o4ms5g9ggs88hp83qnqm21k0a420.apps.googleusercontent.com',
            clientSecret: 'rrkNEBAvMIMb1nzWsIMKDnQb',
            callbackURL: 'http://localhost:3000/login/google/callback',
            scope: ['email', 'profile'],
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const user = await this.userService.findOrCreateFbUser(profile);
        done(null, user);
    }
}