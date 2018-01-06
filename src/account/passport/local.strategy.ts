import { Component, Inject } from '@nestjs/common';
import { User, IUserModel } from '../schemas/user.schema';

import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { AccountService } from '../account.service';

@Component()
export class LocalStrategy extends Strategy {
  constructor(private readonly accountService: AccountService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    }, async (req, email, password, done) =>
      await this.logIn(email, password, done),
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

  async logIn(email, password, done) {
    try {
      const user: IUserModel = await this.accountService.findByEmail(email);
      if (!user) { return done('invalid username', false); }

      const isMatch: boolean = await user.comparePassword(password);
      if (!isMatch) { return done ('invalid password', false) ; }
      return done(null, user);

    } catch (err) {
      done('there was a problem logging in', false );
    }
  }
}
