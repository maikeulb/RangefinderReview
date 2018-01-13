import { Component, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '../../models/interfaces/comment.interface';
import { CommentSchema } from '../../models/schemas/comment.schema';
import { CreateCommentCommand } from '../../comments/commands/createComment.command';
import { EditCommentCommand } from '../../comments/commands/editComment.command';

@Component()
export class CommentsService {
  constructor(@InjectModel(CommentSchema) private readonly commentModel: Model<Comment>) {}

  async create (command: CreateCommentCommand): Promise<Comment> {
    const createdComment = await new this.commentModel(command);
    return createdComment; 
  }

  async findByIdAndUpdate(id: string, command: EditCommentCommand): Promise<Comment> {
    try {
      return await this.commentModel.findByIdAndUpdate(id, command);
    } catch (err) {
      throw err;
    }
  }

}
