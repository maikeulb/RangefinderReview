import { Component, Inject } from '@nestjs/common';
import { User, IUserModel } from '../schemas/user.schema';

import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { AccountService } from '../account.service';

@Component()
export class LocalLoginStrategy extends Strategy {
  constructor(private readonly accountService: AccountService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    }, 
      async (email, password, done) =>
      await this.logIn(email, password, done),
    );

    passport.use('local-login', this);

    passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
        done(err, user);
      });
    });

  }

  async logIn(email, password, done) {
      const user: IUserModel = await this.accountService.findByEmail(email);
      console.log(user)
      if (!user) {
        return done('invalid username', false);
      }

      const isMatch: boolean = await user.comparePassword(password);
      console.log(isMatch)
      if (!isMatch) {
        return done ('invalid password', false);
      }
      return done(null, user);

  }
}
