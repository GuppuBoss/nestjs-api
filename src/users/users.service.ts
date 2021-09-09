import { Inject, Injectable } from '@nestjs/common';
import { userInterface } from 'src/schemas/user.interface';
import { Model } from 'mongoose';
import config from '../config';
import { JwtService } from '@nestjs/jwt';
import { UserRecieved } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(config.USER_MODEL)
    private userModel: Model<userInterface>,
    private jwtService: JwtService
  ) { }

  async findOne (username: string): Promise<userInterface> {
    const user = await this.userModel.findOne({ username: username })
    if (!!user) return user;
  }
  async signUpUser (payload: UserRecieved) {
    const { name, username, email, password } = payload;
    const user = await this.userModel.create({ name, username, email, password });
    return {
      access_token: this.jwtService.sign({ name: user.name, sub: user._id.toString() })
    }
  }
  async findOrCreateFbUser (profile) {
    const user = await this.findOne(profile.name);
    if (user && Object.keys(user).length !== 0) {
      return user
    }
    const createdUser = await this.userModel.create({
      id: profile.id,
      email: profile.emails[ 0 ].value,
      name: profile.name.givenName,
      username: profile.name.givenName + profile.name.familyName,
      password: profile.password
    })
    return createdUser;
  }
}
