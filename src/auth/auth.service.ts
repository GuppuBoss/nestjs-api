import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import User from 'src/users/dto/createUser.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);

        if (user && user.password === password) {
            const { password, ...rest } = user;
            return rest;
        }

        return null;
    }

    async login(user: User) {
        const payload = { name: user.name, sub: user.id }

        return {
            access_token: this.jwtService.sign(payload)
        }

    }
}
