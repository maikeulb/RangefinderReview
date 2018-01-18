import { Controller, Get, Post, Res, Req, Next } from '@nestjs/common';
import { Request, Response } from 'express';

import { UserService } from './user.service';

@Controller('account')
export class AccountController {
  constructor(private readonly userService: UserService) {}

  // local login
  @Get('login')
  getLogin( @Req() req: Request, @Res() res: Response ): void {
    res.render('account/login', {
      title: 'Login',
    });
  }

  @Post('login')
  async postLogin( @Req() req: Request, @Res() res: Response ): Promise<void>{ }

  @Get('/callback')
  callback(@Req() req: Request, @Res() res: Response): void {
    try {
      console.log(req.session);
      res.redirect(req.session.returnTo || '/');
    } catch (err) {
      throw err;
    }
  }

  // local register
  @Get('register')
  getRegister( @Req() req: Request, @Res() res: Response ): void {
    res.render('account/register', {
      title: 'Register',
    });
  }

  @Post('register')
  async postRegister( @Req() req: Request, @Res() res: Response ): Promise<void> {}

  // google
  @Get('google/callback')
  async googleCallback(): Promise<void> {}

  @Get('google')
  async googleSignIn(): Promise<void> {}

  // github
  @Get('github')
  async githubSignIn(): Promise<void> {}

  @Get('github/callback')
  async githubCallBack(): Promise<void> {}

  @Get('logout')
  logout( @Req() req: Request, @Res() res: Response): void {
    req.logout();
    res.redirect('/');
  }

  @Get('profile')
  getProfile( @Req() req: Request, @Res() res: Response): void {
    res.render('account/profile', {
      user: req.user,
    });
  }

}
