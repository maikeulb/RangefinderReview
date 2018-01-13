import { Controller, Get, Post, Put, Body, Delete, Req, Res, Param } from '@nestjs/common';
import { Review } from '../models/interfaces/review.interface';
import { Comment } from '../models/interfaces/comment.interface';
import { CreateCommentCommand} from './commands/createComment.command';
import { EditCommentCommand} from './commands/editComment.command';
import { ReviewsService } from '../data/repositories/reviews.service';
import { CommentsService } from '../data/repositories/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService,
              private readonly reviewsService: ReviewsService,
  ) {}

  @Get('/new/:id')
  async getCreateNew(@Req() req, @Res() res, @Param() params): Promise<Review> {
    try {
      const result = await this.reviewsService.findById(params.id);
      return res.render('comments/new', {
        review: result,
      });
    } catch (err) {
      throw err;
    }
  }

  @Post('/new/:id')
  async createNew(@Req() req, @Res() res, @Param() params, @Body() createCommentCommand: CreateCommentCommand): Promise<Review[]> {
    try {
      const review = await this.reviewsService.findById(params.id);
      const comment = await this.commentsService.create(createCommentCommand);

      comment.author.username = req.user.username;
      comment.author.id = req.user._id;
      await comment.save();

      review.comments = review.comments.concat([comment]);

      await review.save();

      return res.redirect('/reviews/details/' + review._id);
    } catch (err) {
      throw err;
    }
  }

  @Post('/edit/:id')
  async getEditComment(@Res() res, @Req() req, @Body() body, @Param() params)  {
    try {
      console.log(body);
      console.log(req.body.review_id);
      console.log(req.body.comment);
      res.render('comments/edit', {
        review: req.body.review,
        review_id: req.body.review_id,
        comment_id: req.body.comment_id,
        comment: req.body.comment,
      });
    } catch (err) {
      throw err;
    }
  }

  @Post('/:id')
  async editComment(@Res() res, @Param() params, @Body() editCommentCommand: EditCommentCommand) {
    try {
      const comment = await this.commentsService.findByIdAndUpdate(params.id, editCommentCommand);
      res.redirect('/reviews/details/' + params.id);
    } catch (err) {
      throw err;
    }
  }

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