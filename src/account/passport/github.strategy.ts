import { Component, Inject } from '@nestjs/common';
import { SecretKey } from './secretKeys';

import { User } from '../interfaces/user.interface';
import { UserSchema } from '../schemas/user.schema';

import * as passport from 'passport';
import { Strategy } from 'passport-github';
import { UserService } from '../user.service';

import { CreateGithubUserCommand } from '../commands/createGithubUser.command';

@Component()
export class GithubStrategy extends Strategy {
  constructor(
    private secretKey: SecretKey,
    private readonly userService: UserService) {
    super({
      clientID: secretKey.getGithubKeys().clientID,
      clientSecret: secretKey.getGithubKeys().clientSecret,
      callbackURL: 'http://localhost:3000/account/github/callback',
      scope: ['login', 'emails'],
    }, async (accessToken, tokenSecret, profile, done) => {
      await this.logIn(accessToken, profile, done);
    },
    );

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
      const user = new CreateGithubUserCommand();
      user.displayName = profile.displayName;
      user.username = profile.username;
      user.githubAccount = {
        githubId: profile.id,
        githubToken: accessToken,
      };
      return done(null, user);
    } catch (err) {
      done('there was a problem logging in', false );
    }
  }
}
