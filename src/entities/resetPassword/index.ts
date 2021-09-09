import { Injectable } from '@nestjs/common';
import config from 'src/config';
import { UsersService } from 'src/users/users.service';
const jwt = require('jsonwebtoken');

@Injectable()
export class ResetPasswordService {

  constructor(private userService: UsersService) { }

  async ResetPassword (payload: { email: string, password: string, redirectUrl: string }) {
    const user = await this.userService.findOneByEmailAndPassword(payload.email, payload.password);
    console.log(user,'******************************')
    if (user) {
      const { redirectUrl } = payload;
      const token = jwt.sign({ user, redirectUrl }, config.RESET_PASSWORD_JWT_TOKEN_SECRET);
      return token;
    }
    else throw new Error("User Not Found");
  }
}