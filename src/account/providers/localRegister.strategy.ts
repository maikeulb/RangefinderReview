import { Component, Inject } from '@nestjs/common';

import { User } from '../interfaces/user.interface';

import * as passport from 'passport';
import { Strategy } from 'passport-local';
import { UserService } from '../user.service';

import { CreateLocalUserCommand } from '../commands/createLocalUser.command';

@Component()
export class LocalRegisterStrategy extends Strategy {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    },
      async (email, password, done) =>
      await this.register(email, password, done),
    );

    passport.use('local-register', this);

    passport.serializeUser((user: any, done) => {
      return done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await userService.findById(id);
        if (user) {
          return done(null, user);
        }
      } catch {
        return done(null, false);
      }
    });

  }

  async register(email, password, done) {
    try {
      const existUser = await this.userService.findByEmail(email);
      if (existUser) {
       return done ('user exists', false);
      }
      if (!existUser) {
        const localUser = new CreateLocalUserCommand();
        localUser.email = email;
        localUser.password = password;
        const newUser = await this.userService.createLocalUser(localUser);
        return done(null, newUser); }
    } catch (err) {
      done('there was a problem logging in from local-register', false );
    }
  }
}
