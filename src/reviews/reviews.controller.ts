import { Controller, Get, Post, Put, Body, Delete, Req, Res, Param } from '@nestjs/common';
import { Request, Response } from 'express';

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
  async getIndex(@Req() req: Request, @Res() res: Response) {
      const optionReviews = await this.reviewsService.findAll();
      return optionReviews.is_some() ?
        res.render('reviews/index', { reviews: optionReviews.unwrap() }) :
        res.send('Need reviews!'); // render review page
  }

  @Get('/create')
  getCreateReview(@Req() req: Request, @Res() res: Response) {
      return res.render('reviews/create');
  }

  @Post('/create')
  async createReview(@Res() res: Response, @Body() createReviewCommand: CreateReviewCommand) {
      const resultCreate = await this.reviewsService.create(createReviewCommand);
      return resultCreate.is_ok() ?
        res.redirect('/reviews') :
        res.send('404: File Not Found');
  }

  @Get('/details/:id')
  async getReview(@Res() res: Response, @Param('id') reviewId: string) {
      const resultReview = await this.reviewsService.findById(reviewId);
      return resultReview.is_ok() ?
        res.render('reviews/details', { review: resultReview.unwrap() }) :
        res.status(404).json({statusCode: 404, message: resultReview.unwrap_err() });
  }

  @Get('/edit/:id')
  async getEditReview(@Res() res: Response, @Param('id') reviewId: string ) {
      const resultReview = await this.reviewsService.findById(reviewId);
      return resultReview.is_ok() ?
        res.render('reviews/edit', { review: resultReview.unwrap() }) :
        res.send('404: File Not Found'); // unwrap err
  }

  @Post('/edit/:id')
  async editReview(@Res() res: Response, @Param('id') reviewId: string, @Body() editReviewCommand: EditReviewCommand) {
      const resultUpdate = await this.reviewsService.findByIdAndUpdate(reviewId, editReviewCommand);
      return resultUpdate.is_ok() ?
        res.redirect('/reviews/') :
        res.send('404: File Not Found');
  }

  @Post('/delete/:id')
  async deleteReview(@Res() res: Response, @Param('id') reviewId: string) {
      const resultRemove = await this.reviewsService.remove(reviewId);
      return resultRemove.is_ok() ?
        res.redirect('/reviews/') :
        res.send('404: File Not Found'); // unwrap err
  }
}
