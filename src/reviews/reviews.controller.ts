import { Controller, Get, Post, Put, Body, Delete, Req, Res, Param } from '@nestjs/common';
import { Review } from './interfaces/review.interface';
import { CreateReviewViewModel } from './viewmodels/createReview.viewmodel';
import { EditReviewViewModel } from './viewmodels/editReview.viewmodel';
import { ReviewsService } from './reviews.service';

@Controller('Reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('/')
  async findAll(@Req() req, @Res() res, err): Promise<Review[]> {
    const foundReviews = await this.reviewsService.findAll();
    return res.render('reviews/index', { reviews: foundReviews }
    );
  }

  @Get('/create')
  getCreate(@Req() req, @Res() res, err) {
    return res.render("reviews/create");
  }

  @Post('/create')
  async createReview(@Res() res, @Body() createReviewViewModel: CreateReviewViewModel) {
    try {
      await this.reviewsService.create(createReviewViewModel);
      res.redirect('/reviews');
    } catch (err) {
      console.log('there was a problem creating a review');
    }
  }

  @Get('/:id')
  async getReview(@Res() res, @Param() params)  {
    try {
      const foundReview = await this.reviewsService.findById(params.id);
      res.render("reviews/details", { review: foundReview });
    } catch (err) {
      res.redirect('/reviews');
      console.log('there was a problem finding the review');
    }
  }

  @Get('/edit/:id')
  async getEditReviewDetails(@Res() res, @Param() params)  {
    try {
      const foundReview = await this.reviewsService.findById(params.id);
      res.render("reviews/edit", { review: foundReview });
    } catch (err) {
      res.redirect('/reviews');
      console.log('there was a problem finding the review');
    }
  }

  @Post('/:id')
  async editReviewDetails(@Res() res, @Param() params, @Body() editReviewViewModel: EditReviewViewModel) {
    try {
      const updatedReview = editReviewViewModel;
      const review = await this.reviewsService.findByIdAndUpdate(params.id, updatedReview);
      res.redirect('/reviews/');
    } catch (err) {
      res.redirect('/reviews/');
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


// // DELETE - removes campground and its comments from the database
// router.delete("/:id", isLoggedIn, checkUserCampground, function(req, res) {
//     Comment.remove({
//       _id: {
//         $in: req.campground.comments
//       }
//     }, function(err) {
//       if(err) {
//           req.flash('error', err.message);
//           res.redirect('/');
//       } else {
//           req.campground.remove(function(err) {
//             if(err) {
//                 req.flash('error', err.message);
//                 return res.redirect('/');
//             }
//             req.flash('error', 'Campground deleted!');
//             res.redirect('/campgrounds');
//           });
//       }
//     })
// });

}
