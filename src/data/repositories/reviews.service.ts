import { Component, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Review } from '../../models/interfaces/review.interface';
import { ReviewSchema } from '../../models//schemas/review.schema';

import { CreateReviewCommand } from '../../reviews/commands/createReview.command';
import { EditReviewCommand } from '../../reviews/commands/editReview.command';

import { Result, Ok, Err } from '@threestup/monads';

@Component()
export class ReviewsService {
  constructor(@InjectModel(ReviewSchema) private readonly reviewModel: Model<Review>) {}

  async create(command: CreateReviewCommand): Promise<Result<boolean, string>> {
    try {
      const createdReview = new this.reviewModel(command);
      await createdReview.save();

      if (createdReview)
        return Ok(true);
      if (!createdReview)
        return Err('Value not found');

    } catch (err) {
      throw err;
    }
  }

  async remove(id: string): Promise<Result<boolean, string>> {
    try {
      const result = this.reviewModel.findById(id).remove()
        .exec();

      if (result)
        return Ok(true);
      if (!result)
        return Err('Value not found');

    } catch (err) {
      throw err;
    }
  }

  async findById(id: string): Promise<Result<Review, string>> {
    try {
      const review = await this.reviewModel.findById(id)
        .populate('comments')
        .exec();

      if (review)
        return Ok(review);
      if (!review)
        return Err('Value not found');

    } catch (err) {
      throw err;
    }
  }

  async findByIdAndUpdate(id: string, command: EditReviewCommand): Promise<Result<boolean, string>> {
    try {
      const result = await this.reviewModel.findByIdAndUpdate(id, command);

      if (result)
        return Ok(true);
      if (!result)
        return Err('Value not found');

    } catch (err) {
      throw err;
    }
  }

  async findAll(): Promise<Result<Review[], string>> {
    try {
      const reviews = await this.reviewModel.find()
        .exec();

      if (reviews)
        return Ok(reviews);
      if (!reviews)
        return Err('Value not found');

    } catch (err) {
      throw err;
    }
  }
}
