import { Component, Inject } from '@nestjs/common';

import { User } from '../interfaces/user.interface';

import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { UserService } from '../user.service';

@Component()
export class LocalLoginStrategy extends Strategy {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    },
      async (email, password, done) =>
      await this.logIn(email, password, done),
    );

    passport.use('local-login', this);

    passport.serializeUser<any, any>((user, done) => {
      return done(null, user);
    });

    passport.deserializeUser((user, done) => {
      return user ?
        done(null, user) :
        done(null, false);
    });
  }

    // passport.deserializeUser(async (id, done) => {
    //   try {
    //     // const user = await userService.findById(id);
    //     // if (user) {
    //       // return done(null, user);
    //     // }
    //   } catch {
    //     return done(null, false);
    //   }
    // });

  async logIn(email, password, done) {
    try {
      const existUser = await this.userService.findByEmail(email);
      if (!existUser) {
        return done('invalid username', false);
      }

      const isMatch: boolean = existUser.comparePassword(password);
      if (!isMatch) {
        return done ('invalid password', false);
      }
      return done(null, existUser);

    } catch (err) {
      return done('there was a problem logging in from local-register', false );
    }
  }
}
