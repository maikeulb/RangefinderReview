import { Component } from '@nestjs/common';
import { SecretKey } from './secretKeys';

import { User } from '../interfaces/user.interface';
import { UserSchema } from '../schemas/user.schema';

import * as passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import { UserService } from '../user.service';

import { CreateGoogleUserCommand } from '../commands/createGoogleUser.command';

@Component()
export class GoogleStrategy extends OAuth2Strategy {
  constructor(
    private secretKey: SecretKey,
    private readonly userService: UserService) {
    super({
      clientID: secretKey.getGoogleKeys().clientID,
      clientSecret: secretKey.getGoogleKeys().clientSecret,
      callbackURL: 'http://localhost:3000/account/google/callback',
    }, async (accessToken, refreshToken, profile, done) => {
      await this.logIn(accessToken, profile, done);
    });

    passport.use(this);

    passport.serializeUser<any, any>((user, done) => {
      return done(null, user);
    });

    passport.deserializeUser((user, done) => {
      return user ?
        done(null, user) :
        done(null, false);
    });

  }

  async logIn(accessToken, profile, done) {
    try {
      const user = new CreateGoogleUserCommand();
      user.displayName = profile.displayName;
      user.googleAccount = {
        googleId: profile.id,
        googleToken: accessToken,
      };

        return done(null, user);
    } catch (err) {
      console.log(err);
      done('there was a problem logging in', false );
    }
  }
}
