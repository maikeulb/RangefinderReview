import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod
} from '@nestjs/common';
import { AccountController } from './account.controller';
import { GoogleStrategy } from './passport/google.strategy';
import { GithubStrategy } from './passport/github.strategy';
import { LocalLoginStrategy } from './passport/localLogin.strategy';
import { LocalRegisterStrategy } from './passport/localRegister.strategy';
import { SecretKey } from './passport/secretKeys';
import { AccountService } from './account.service';
import * as passport from 'passport';

@Module({
  controllers: [AccountController],
  components: [
    GoogleStrategy,
    GithubStrategy,
    LocalLoginStrategy,
    LocalRegisterStrategy,
    SecretKey,
    AccountService,
  ],
})

export class AccountModule implements NestModule {
  public configure(consumer: MiddlewaresConsumer) {
    consumer

     // google Login
     .apply(passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'],
      }))
      .forRoutes({ path: '/account/google', method: RequestMethod.GET })
      // google CallBack URL
      .apply(passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/error'
      }))
      .forRoutes({ path: '/account/google/callback', method: RequestMethod.GET })
       // github login
      .apply(passport.authenticate('github', {
          scope: ['email'],
      }))
      .forRoutes({ path: '/account/github', method: RequestMethod.ALL })
      // github callback
      .apply(passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/error',
      }))
      .forRoutes({ path: '/account/github/callback', method: RequestMethod.ALL })

       // local login-login
      .apply(passport.authenticate('local-login', {
        successRedirect: '/account/callback',
        failureRedirect: '/error',
      }))
      .forRoutes({ path: '/account/login', method: RequestMethod.POST })

       // local login-register
      .apply(passport.authenticate('local-register', {
        successRedirect: '/',
        failureRedirect: '/error',
      }))
      .forRoutes({ path: '/account/register', method: RequestMethod.POST });
  }
}
