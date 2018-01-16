import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';


@Controller()
export class HomeController {
  constructor() { }

  @Get('/')
  getIndexPage( @Res() res) {
    res.render('index');
  }
}

@Controller('error')
export class ErrorController {
  constructor() { }

  @Get()
  getError( @Res() res) {
    res.render('error', {
      title: 'Error Page'
  });
  }
}
