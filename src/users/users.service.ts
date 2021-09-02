import { Inject, Injectable } from '@nestjs/common';
import { userInterface } from 'src/schemas/user.interface';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @Inject(`${process.env.USER_MODEL_PROVIDER}`)
    private userModel: Model<userInterface>,
  ) { }
  // private readonly Users: User[] = [
  //   {
  //     id: 1,
  //     name: "Hunain",
  //     username: "codife",
  //     password: "1234",
  //     email: "test@yopmail.com"
  //   },
  //   {
  //     id: 2,
  //     name: "Danial",
  //     username: "guppuboss",
  //     password: "1234",
  //     email: "test@yopmail.com",
  //   }
  // ];

  // async findOne (username: string): Promise<User> {
  //   return this.Users.find(user => user.username === username);
  // }

  // async findOrCreateFbUser (profile): Promise<User> {
  //   const user = await this.findOne(profile.name);
  //   if (user) {
  //     return user;
  //   }
  //   const createdUser = {
  //     id: profile.id,
  //     email: profile.emails[ 0 ].value,
  //     name: profile.name.givenName,
  //     username: profile.name.givenName + profile.name.familyName,
  //   };
  //   this.Users.push(createdUser);
  //   return createdUser;
  // }
  async findOne (username: string): Promise<userInterface> {
    const user = await this.userModel.findOne({ username: username })
    if(!!user) return user;
  }
  async findOrCreateFbUser (profile) {
    const user = await this.findOne(profile.name);
    if(user && Object.keys(user).length !== 0) 
    {
      return user
    }
    const createdUser = await this.userModel.create({
      id: profile.id,
      email: profile.emails[0].value,
      name: profile.name.givenName,
      username: profile.name.givenName + profile.name.familyName,
      password: profile.password
    })
    return createdUser;
  }
}
