import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import { UsersService } from "src/users/users.service";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor(private usersService: UsersService) {
    super({
      clientID: `${process.env.FACEBOOK_APP_ID}`,
      clientSecret: `${process.env.FACEBOOK_APP_SECRET}`,
      callbackURL: "http://localhost:3000/login/facebook/redirect",
      scope: "email",
      profileFields: ["id", "emails", "name"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const user = await this.usersService.findOrCreateFbUser(profile);
    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}