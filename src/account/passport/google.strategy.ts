import { Component } from '@nestjs/common';
import { SecretKey } from './secretKeys';
import { User, IUserModel } from '../schemas/user.schema';

import * as passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import { AccountService } from '../account.service';

@Component()
export class GoogleStrategy extends OAuth2Strategy {
  constructor(
    private secretKey: SecretKey,
    private readonly accountService: AccountService) {
    super({
      clientID: secretKey.getGoogleKeys().clientID,
      clientSecret: secretKey.getGoogleKeys().clientSecret,
      callbackURL: 'http://localhost:3000/account/google/callback',
    }, async (accessToken, refreshToken, profile, done) => {
      await this.logIn(accessToken, profile, done); },
    );

    passport.use(this);

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
        done(err, user);
      });
    });

  }

  async logIn(profile, accessToken, done) {
    try {
      const existUser: IUserModel = await this.accountService.findById(profile.id);
      if (existUser) { return done(null, existUser); }
      if (!existUser) {
      const newUser: IUserModel = new User ({
        displayName: profile.displayName,
        email: profile.emails[0].value,
        googleAccount: {
          googleId: profile.id,
          googleToken: accessToken,
        },
      });
      newUser.save();
      return done(null, newUser); }

    } catch (err) {
      done('there was a problem logging in', false );
    }
  }
}
