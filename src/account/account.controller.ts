import { Controller, Get, Post, Res, Req, Next } from '@nestjs/common';
import { Users, UserModel } from './schemas/user.schema';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  // local
  @Get('login')
  getLogin( @Req() req, @Res() res ) {
    res.render('account/login', {
      title: 'Login',
    });
  }

  @Post('login')
  async postLogin( @Req() req, @Res() res ) { }

  @Get('/callback')
  callback(@Req() req, @Res() res) {
    res.redirect(req.session.returnTo || '/');
  }

  @Get('register')
  getRegister( @Req() req, @Res() res ) {
    res.render('account/register', {
      title: 'Register',
    });
  }

  @Post('register')
  async postRegister( @Req() req, @Res() res ) {}

  // google
  @Get('google/callback')
  async googleCallback() {}

  @Get('google')
  async googleSignIn() {}

  // github
  @Get('github')
  async githubSignIn() {}

  @Get('github/callback')
  async githubCallBack() {}

  @Get('logout')
  logout( @Req() req, @Res() res) {
    req.logout();
    res.redirect('/');
  }

  @Get('profile')
  getProfile( @Req() req, @Res() res) {
    res.render('account/profile', {
      user: req.user,
    });
  }

}
