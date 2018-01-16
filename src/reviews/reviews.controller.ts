import { Controller, Get, Post, Put, Body, Delete, Req, Res, Param } from '@nestjs/common';
import { Request, Response } from "express";

import { ReviewsService } from '../data/repositories/reviews.service';

import { Review } from '../models/interfaces/review.interface';

import { CreateReviewCommand} from './commands/createReview.command';
import { EditReviewCommand} from './commands/editReview.command';

// import { LocalStrategyInfo } from "passport-local";
// import { WriteError } from "mongodb";
// const request = require("express-validator");
// nestjs authorized, onundefined, currentuser

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('/')
  async getIndex(@Req() req: Request, @Res() res: Response, err) {
    try {
      const result = await this.reviewsService.findAll();

      if (result.is_ok())
        return res.render('reviews/index', {
          reviews: result.unwrap(),
        });
      if (result.is_err())
        return res.send('404: File Not Found');

    } catch (err) {
      throw err;
    }
  }

  @Get('/create')
  getCreateReview(@Req() req: Request, @Res() res: Response, err) {
    try {
      return res.render('reviews/create');
    } catch (err) {
      throw err;
    }
  }

  @Post('/create')
  async createReview(@Res() res: Response, @Body() createReviewCommand: CreateReviewCommand) {
    try {
      const result = await this.reviewsService.create(createReviewCommand);

      if (result.is_ok())
        return res.redirect('/reviews');
      if (result.is_err())
        return res.send('404: File Not Found');

    } catch (err) {
      throw err;
    }
  }

  @Get('/details/:id')
  async getReview(@Res() res: Response, @Param('id') id: string) {
    try {
      const result = await this.reviewsService.findById(id);

      if (result.is_ok())
        return res.render('reviews/details', {
          review: result.unwrap(),
        });
      if (result.is_err())
        return res.send('404: File Not Found');

    } catch (err) {
      res.redirect('/reviews');
    }
  }

  @Get('/edit/:id')
  async getEditReview(@Res() res: Response, @Param('id') id: string ) {
    try {
      const result = await this.reviewsService.findById(id);

      if (result.is_ok())
        return res.render('reviews/edit', {
          review: result.unwrap(),
        });
      if (result.is_err())
        return res.send('404: File Not Found');

    } catch (err) {
      res.redirect('/reviews');
    }
  }

  @Post('/edit/:id')
  async editReview(@Res() res: Response, @Param('id') id: string, @Body() editReviewCommand: EditReviewCommand) {
    try {
      const result = await this.reviewsService.findByIdAndUpdate(id, editReviewCommand);

      if (result.is_ok())
        return res.redirect('/reviews/');
      if (result.is_err())
        return res.send('404: File Not Found');

    } catch (err) {
      throw err;
    }
  }

  @Post('/delete/:id')
  async deleteReview(@Res() res: Response, @Param('id') id: string) {
    try {
      const result = await this.reviewsService.remove(id);

      if (result.is_ok())
        return res.redirect('/reviews/');
      if (result.is_err())
        return res.send('404: File Not Found');

    } catch (err) {
      res.redirect('/');
      // log error (youtube-nest example and contoso-node)
    }
  }

}
