import { Component, Inject } from '@nestjs/common';

import { User } from '../interfaces/user.interface';
import { UserSchema } from '../schemas/user.schema';

import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users.service';

@Component()
export class LocalLoginStrategy extends Strategy {
  constructor(private readonly usersService: UsersService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    },
      async (email, password, done) =>
      await this.logIn(email, password, done),
    );

    passport.use('local-login', this);

    passport.serializeUser((user: any, done) => {
      return done(null, user.id);
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

  async logIn(email, password, done) {
    try {
      const existUser = await this.usersService.findByEmail(email);
      console.log(existUser);
      if (!existUser) {
        return done('invalid username', false);
      }

      const isMatch: boolean = existUser.comparePassword(password);
      console.log(isMatch);
      if (!isMatch) {
        return done ('invalid password', false);
      }
      return done(null, existUser);

    } catch (err) {
      done('there was a problem logging in from local-register', false );
    }
  }
}
