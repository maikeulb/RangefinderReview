import { Controller, Get, Post, Res, Req, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from "express";
import { WriteError } from "mongodb";

import { UsersService } from './users.service';

@Controller('account')
export class AccountController {
  constructor(private readonly usersService: UsersService) {}

  @Get('login')
  getLogin( @Req() req: Request, @Res() res: Response ): void {
    res.render('account/login', {
      title: 'Login',
    });
  }

  @Post('login')
  async postLogin( @Req() req: Request, @Res() res: Response ) : Promise<void>{ }

  @Get('/callback')
  callback(@Req() req: Request, @Res() res: Response): void {
    res.redirect(req.session.returnTo || '/');
  }

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
