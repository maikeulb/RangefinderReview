import { Component, Inject } from '@nestjs/common';
import { Users, UserModel } from '../schemas/user.schema';

import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { AccountService } from '../account.service';

@Component()
export class LocalRegisterStrategy extends Strategy {
  constructor(private readonly accountService: AccountService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    },
      async (email, password, done) =>
      await this.register(email, password, done),
    );

    passport.use('local-register', this);

    passport.serializeUser((user:any, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      Users.findById(id, (err, user) => {
        done(err, user);
      });
    });

  }

  async register(email, password, done) {
    try {
      const user: UserModel = await this.accountService.findByEmail(email);
      if (!user) {

        const newUser: UserModel = new Users ({
          email: email,
          password: password,
        });

        newUser.save();
        return done(null, newUser);
      }
      if (user) {
       return done ('user exists', false);
      }
    } catch (err) {
      done('there was a problem logging in from local-register', false );
    }
  }
}
