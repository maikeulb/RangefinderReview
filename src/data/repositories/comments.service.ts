import { Component, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Comment } from '../../models/interfaces/comment.interface';
import { CommentSchema } from '../../models/schemas/comment.schema';

import { CreateCommentCommand } from '../../comments/commands/createComment.command';
import { EditCommentCommand } from '../../comments/commands/editComment.command';

import { Result, Ok, Err } from '@threestup/monads';

@Component()
export class CommentsService {
  constructor(@InjectModel(CommentSchema) private readonly commentModel: Model<Comment>) {}

  async create(command: CreateCommentCommand): Promise<Result<Comment, string>> {
    try {
      return Ok(await new this.commentModel(command));
    } catch (err) {
      return Err('comment could not created');
    }
  }

  async findByIdAndUpdate(command: EditCommentCommand): Promise<Result<Comment, string>> {
    try {
      const updatedComment = await this.commentModel.findByIdAndUpdate(
        command.commentId,
        { $set: { comment : command.comment } },
        { upsert: true }
      );
      console.log(updatedComment);
      return Ok(updatedComment);
    } catch (err) {
      return Err('could not update'); // log mongo err
    }
  }

}
