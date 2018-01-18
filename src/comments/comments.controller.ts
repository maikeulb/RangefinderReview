import { Controller, Get, Post, Put, Body, Delete, Req, Res, Param } from '@nestjs/common';

import { ReviewsService } from '../data/repositories/reviews.service';
import { CommentsService } from '../data/repositories/comments.service';

import { Review } from '../models/interfaces/review.interface';
import { Comment } from '../models/interfaces/comment.interface';

import { CreateCommentCommand} from './commands/createComment.command';
import { EditCommentCommand} from './commands/editComment.command';
import { RemoveCommentCommand} from './commands/removeComment.command';

import { Request, Response, NextFunction } from 'express';

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

    const resultReview = await this.reviewsService.findById(reviewId);
    const resultComment = await this.commentsService.create(createCommentCommand);

    if (resultReview.is_ok() && resultComment.is_ok()) {
      const review = resultReview.unwrap();
      const comment = resultComment.unwrap();
      comment.author.username = req.user.username;
      comment.author.id = req.user._id;
      await comment.save();
      review.comments = review.comments.concat([comment]);
      await review.save();
      return res.redirect('/reviews/details/' + review._id);
    } else {
      res.status(500).json({statusCode: 500, message: resultReview.unwrap_err() });
    }
  }

  @Post('/edit/:id')
  getEditComment(@Res() res: Response, @Param('id') reviewId: string, @Body() body) {
    res.render('comments/edit', {
      reviewId,
      commentId: body.commentId,
      comment: body.comment,
    });
  }

  @Post('/:id')
  async editComment(@Res() res: Response, @Param('id') reviewId: string, @Body() editCommentCommand: EditCommentCommand) {
    const resultUpdate = await this.commentsService.findByIdAndUpdate(editCommentCommand); //use reviewId
    return resultUpdate.is_ok() ?
      res.redirect('/reviews/details/' + reviewId) :
      res.status(500).json({statusCode: 500, message: resultUpdate.unwrap_err() });
  }

  @Post('delete/:id')
  async deleteComment(@Res() res: Response, @Param('id') reviewId: string, @Body() removeCommentCommand: RemoveCommentCommand) {
    const resultRemove = await this.reviewsService.removeComment(removeCommentCommand);
    return resultRemove.is_ok() ?
      res.redirect('/reviews/details/' + reviewId) :
      res.status(500).json({statusCode: 500, message: resultRemove.unwrap_err() });
  }

}
