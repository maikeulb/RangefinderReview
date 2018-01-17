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
      scope: ['displayName', 'emails'],
    }, async (accessToken, tokenSecret, profile, done) => {
      await this.logIn(accessToken, profile, done);
    },
    );

    passport.use(this);

    passport.serializeUser((user: any, done) => {
      return done(null, user);
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

        const githubUser = new CreateGithubUserCommand();
        githubUser.displayName = profile.displayName;
        githubUser.githubAccount = {
          githubId: profile.id,
          githubToken: accessToken,
        };

        const newUser = await this.userService.createGithubUser(githubUser);
        return done(null, newUser);
      }

    } catch (err) {
      done('there was a problem logging in', false );
    }
  }
}
