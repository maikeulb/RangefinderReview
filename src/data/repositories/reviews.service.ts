import { Component, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Review } from '../../models/interfaces/review.interface';
import { ReviewSchema } from '../../models//schemas/review.schema';

import { CreateReviewCommand } from '../../reviews/commands/createReview.command';
import { EditReviewCommand } from '../../reviews/commands/editReview.command';

import { Result, Ok, Err } from '@threestup/monads';
import { Option, Some, None } from '@threestup/monads';

import { WriteOpResult } from 'mongodb';

@Component()
export class ReviewsService {
  constructor(@InjectModel(ReviewSchema) private readonly reviewModel: Model<Review>) {}

  async findAll(): Promise<Option<Review[]>> {
      const optionReviews = await this.reviewModel.find()
        .exec();
      return optionReviews ?
        Some(optionReviews) :
        None;
  }

  async findById(id: string): Promise<Result<Review, string>> {
    try {
      return Ok(await this.reviewModel.findById(id)
        .populate('comments')
        .exec()
      );
    } catch (err) {
      return Err('review not found');
    }
  }

  async create(command: CreateReviewCommand): Promise<Result<Review, string>> {
    try {
      const resultCreate = new this.reviewModel(command);
      await resultCreate.save(); // remove
      return Ok(resultCreate);
    } catch (err) {
      return Err('could not update'); // log mongo err
    }
  }

  async findByIdAndUpdate(id: string, command: EditReviewCommand): Promise<Result<Review, string>> {
    try {
      return Ok(await this.reviewModel.findByIdAndUpdate(id, command));
    } catch (err) {
      return Err('could not update'); // log mongo err
    }
  }

  async remove(id: string): Promise<Result<WriteOpResult, string>> {
    try {
      return Ok(await this.reviewModel.findById(id)
        .remove()
        .exec()
      );
    } catch (err) {
      return Err('could not remove'); // log mongo err
    }
  }
}
