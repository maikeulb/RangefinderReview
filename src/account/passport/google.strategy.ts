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

    passport.serializeUser((user: any, done) => {
      try {
        return done(null, user);
      } catch {
        return done(null, false);
      }
    });

    passport.deserializeUser((user: any, done) => {
      try {
        return done(null, user);
      } catch {
        return done(null, false);
      }
    });

    // passport.deserializeUser(async (id, done) => {
    //   try {
    //     const user = await userService.findById(id);
    //     if (user) {
    //       return done(null, user);
    //     }
    //   } catch {
    //     return done(null, false);
    //   }
    // });
  }

  async logIn(profile, accessToken, done) {
    try {
      const existUser = await this.userService.findById(profile.id);
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
        const newUser = await this.userService.createGoogleUser(googleUser);
        return done(null, newUser); }
    } catch (err) {
      done('there was a problem logging in', false );
    }
  }
}
