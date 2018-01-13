import { Controller, Get, Post, Put, Body, Delete, Req, Res, Param } from '@nestjs/common';
import { Review } from '../models/interfaces/review.interface';
import { CreateReviewCommand} from './commands/createReview.command';
import { EditReviewCommand} from './commands/editReview.command';
import { ReviewsService } from '../data/repositories/reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('/')
  async getIndex(@Req() req, @Res() res, err): Promise<Review[]> {
    const retrievedReviews = await this.reviewsService.findAll();
    return res.render('reviews/index', { 
      reviews: retrievedReviews 
    });
  }

  @Get('/create')
  getCreateReview(@Req() req, @Res() res, err) {
    return res.render('reviews/create');
  }

  @Post('/create')
  async createReview(@Res() res, @Body() createReviewCommand: CreateReviewCommand) {
    try {
      await this.reviewsService.create(createReviewCommand);
      res.redirect('/reviews');
    } catch (err) {
      throw err;
    }
  }

  @Get('/details/:id')
  async getReview(@Res() res, @Param() params)  {
    try {
      const result = await this.reviewsService.findById(params.id);
      return res.render('reviews/details', {
        review: result,
      });
    } catch (err) {
      res.redirect('/reviews');
    }
  }

  @Get('/edit/:id')
  async getEditReview(@Res() res, @Param() params)  {
    try {
      const result = await this.reviewsService.findById(params.id);
      res.render('reviews/edit', {
        review: result,
      });
    } catch (err) {
      res.redirect('/reviews');
    }
  }

  @Post('/edit/:id')
  async editReview(@Res() res, @Param() params, @Body() editReviewCommand: EditReviewCommand) {
    try {
      const review = await this.reviewsService.findByIdAndUpdate(params.id, editReviewCommand);
      res.redirect('/reviews/');
    } catch (err) {
      throw err;
    }
  }

  @Post('/delete/:id')
  async deleteReview(@Res() res, @Param() params) {
    try {
      await this.reviewsService.remove(params.id);
      res.redirect('/reviews/');
    } catch (err) {
      res.redirect('/');
    }
  }

}
