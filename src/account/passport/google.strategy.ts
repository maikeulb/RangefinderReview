import { Component } from '@nestjs/common';
import { SecretKey } from './secretKeys';

import { User } from '../interfaces/user.interface';
import { UserSchema } from '../schemas/user.schema';

import * as passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import { UsersService } from '../users.service';

import { CreateGoogleUserCommand } from '../commands/createGoogleUser.command';

@Component()
export class GoogleStrategy extends OAuth2Strategy {
  constructor(
    private secretKey: SecretKey,
    private readonly usersService: UsersService) {
    super({
      clientID: secretKey.getGoogleKeys().clientID,
      clientSecret: secretKey.getGoogleKeys().clientSecret,
      callbackURL: 'http://localhost:3000/account/google/callback',
    }, async (accessToken, refreshToken, profile, done) => {
      await this.logIn(accessToken, profile, done);
    });

    passport.use(this);

    passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await usersService.findById(id);
        if (user) {
          return done(null, user);
        }
      } catch {
        return done(null, false);
      }
    });

  }

  async logIn(profile, accessToken, done) {
    try {
      const existUser = await this.usersService.findById(profile.id);
      if (existUser) {
        return done(null, existUser);
      }

      if (!existUser) {
        const googleUser = new CreateGoogleUserCommand();
        googleUser.displayName = profile.displayName;
        googleUser.email = profile.emails[0].value;
        googleUser.googleAccount = {
          googleId: profile.id,
          googleToken: accessToken,
        };

        const newUser = await this.usersService.createGoogleUser(googleUser);
        return done(null, newUser); }

    } catch (err) {
      done('there was a problem logging in', false );
    }
  }
}
