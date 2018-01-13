import { Component, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from '../../models/interfaces/review.interface';
import { ReviewSchema } from '../../models//schemas/review.schema';
import { CreateReviewCommand } from '../../reviews/commands/createReview.command';
import { EditReviewCommand } from '../../reviews/commands/editReview.command';

@Component()
export class ReviewsService {
  constructor(@InjectModel(ReviewSchema) private readonly reviewModel: Model<Review>) {}

  async create(command: CreateReviewCommand): Promise<Review> {
    const createdReview = new this.reviewModel(command);
    return await createdReview.save();
  }

  async remove(id: string): Promise<void> {
    try {
      await this.reviewModel.findById(id).remove();
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string) {
    try {
      return await this.reviewModel.findById(id)
        .populate('comments')
        .exec();
    } catch (err) {
      throw err;
    }
  }

  async findByIdAndUpdate(id: string, command: EditReviewCommand): Promise<Review> {
    try {
      return await this.reviewModel.findByIdAndUpdate(id, command);
    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewModel.find().exec();
  }
}
