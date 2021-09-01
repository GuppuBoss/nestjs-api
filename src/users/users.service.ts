import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    name: string;
    username: string;
    password?: string;
    email: string;
}

@Injectable()
export class UsersService {
   private readonly Users: User[] = [
       {
           id: 1,
           name: "Hunain",
           username: "codife",
           password: "1234",
           email: "test@yopmail.com"
       },
       {
            id: 2,
            name: "Danial",
            username: "guppuboss",
            password: "1234",
            email: "test@yopmail.com",
       }
   ];

   async findOne(username: string): Promise<User | undefined> {
       return this.Users.find(user => user.username === username);
   }

   async findOrCreateFbUser(profile): Promise<User> {
    const user = await this.findOne(profile.name);
    if (user) {
      return user;
    }
    const createdUser = {
      id: profile.id,
      email: profile.emails[0].value,
      name: profile.name.givenName,
      username: profile.name.givenName + profile.name.familyName,
    };
    this.Users.push(createdUser);
    return createdUser;
  }
 }
