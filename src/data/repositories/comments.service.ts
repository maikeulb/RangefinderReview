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
      const comment = await new this.commentModel(command);

      if (comment)
        return Ok(comment);
      if (!comment)
        return Err('Value not found');

    } catch (err) {
      throw err;
    }
  }

  async findByIdAndUpdate(id: string, command: EditCommentCommand): Promise<Result<boolean, string>> {
    try {
      const result = await this.commentModel.findByIdAndUpdate(id, command);

      if (result )
        return Ok(true);
      if (!result)
        return Err('Value not found');

    } catch (err) {
      throw err;
    }
  }

}
