import { Component } from '@nestjs/common';
import { SecretKey } from './secretKeys';
import { User, IUserModel } from '../schemas/user.schema';

import * as passport from 'passport';
import { Strategy } from 'passport-github';
import { AccountService } from '../account.service';

@Component()
export class GithubStrategy extends Strategy {
  constructor(
    private secretKey: SecretKey,
    private readonly accountService: AccountService) {
    super({
      clientID: secretKey.getGithubKeys().clientID,
      clientSecret: secretKey.getGithubKeys().clientSecret,
      callbackURL: 'http://localhost:3000/account/github/callback',
      scope: ['displayName', 'emails'],
    }, async (accessToken, tokenSecret, profile, done) => {
      await this.logIn(accessToken, profile, done); },
    );

    passport.use(this);

    passport.serializeUser((user: any, done) => {
      done(null, user.id);
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
      if (existUser) { 
        return done(null, existUser); 
      }
      if (!existUser) {
      const newUser: IUserModel = new User ({
        displayName: profile.displayName,
        githubAccount: {
          githubId: profile.id,
          githubToken: accessToken,
        },
      });
      newUser.save();
      return done(null, newUser); }

    } catch (err) {
      done('there was a problem logging in', false );
    }
  }
}
