import { Controller, Get, Post, Put, Body, Delete, Req, Res, Param } from '@nestjs/common';

import { ReviewsService } from '../data/repositories/reviews.service';
import { CommentsService } from '../data/repositories/comments.service';

import { Review } from '../models/interfaces/review.interface';
import { Comment } from '../models/interfaces/comment.interface';

import { CreateCommentCommand} from './commands/createComment.command';
import { EditCommentCommand} from './commands/editComment.command';

import { Request, Response, NextFunction } from "express";

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService,
              private readonly reviewsService: ReviewsService,
  ) {}

  @Get('/new/:id')
  async getCreateNew(@Res() res: Response, @Param('id') reviewId: string) {
    const resultReview = await this.reviewsService.findById(reviewId);
    return resultReview.is_ok() ?
      res.render('comments/new', { review: resultReview.unwrap() }) :
      res.status(404).json({statusCode: 404, message: resultReview.unwrap_err() });
  }

  @Post('/new/:id')
  async createNew(@Req() req: Request, @Res() res: Response, @Param('id') reviewId: string, @Body() createCommentCommand: CreateCommentCommand) {

    const reviewResult = await this.reviewsService.findById(reviewId);
    const commentResult = await this.commentsService.create(createCommentCommand);

    if (reviewResult.is_ok() && commentResult.is_ok()) {
      const review = reviewResult.unwrap();
      const comment = commentResult.unwrap();
      comment.author.username = req.user.username;
      comment.author.id = req.user._id;
      await comment.save();
      review.comments = review.comments.concat([comment]);
      await review.save();
      return res.redirect('/reviews/details/' + review._id);
    } else {
      return res.send('404: File Not Found');
    }
  }

  // @Post('/edit/:id')
  // async getEditComment(@Req() req: Request, @Res() res: Response, @Body() body, @Param() params) {
  //   try {
  //     console.log(body);
  //     console.log(req.body.review_id);
  //     console.log(req.body.comment);
  //     res.render('comments/edit', {
  //       review: req.body.review,
  //       review_id: req.body.review_id,
  //       comment_id: req.body.comment_id,
  //       comment: req.body.comment,
  //     });
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // @Post('/:id')
  // async editComment(@Res() res: Response, @Param() reviewId: string, @Body() editCommentCommand: EditCommentCommand) {
  //   try {
  //     await this.commentsService.findByIdAndUpdate(reviewId, editCommentCommand);
  //     res.redirect('/reviews/details/' + params.id);
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  // @Post('/delete/:id')
  // async deleteReview(@Res() res, @Param() params) {
  //   try {
  //     await this.reviewsService.remove(params.id);
  //     res.redirect('/reviews/');
  //   } catch (err) {
  //     res.redirect('/');
  //   }
  // }

// router.delete("/:commentId", isLoggedIn, checkUserComment, function(req, res){
//   // find campground, remove comment from comments array, delete comment in db
//   Campground.findByIdAndUpdate(req.params.id, {
//     $pull: {
//       comments: req.comment.id
//     }
//   }, function(err) {
//     if(err){ 
//         console.log(err)
//         req.flash('error', err.message);
//         res.redirect('/');
//     } else {
//         req.comment.remove(function(err) {
//           if(err) {
//             req.flash('error', err.message);
//             return res.redirect('/');
//           }
//           req.flash('error', 'Comment deleted!');
//           res.redirect("/campgrounds/" + req.params.id);
//         });
//     }
//   });
// });

}
