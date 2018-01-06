import { Component, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Review } from './interfaces/review.interface';
import { ReviewModel } from './schemas/review.schema';
import { CreateReviewViewModel } from './viewmodels/createReview.viewmodel';
import { EditReviewViewModel } from './viewmodels/editReview.viewmodel';

@Component()
export class ReviewsService {
  constructor(
    @Inject('ReviewsToken') private readonly reviewModel: Model<ReviewModel>) {}

  async create(model: CreateReviewViewModel): Promise<ReviewModel> {
    const createdReview = new this.reviewModel(model);
    return await createdReview.save();
  }

  async remove(id: string): Promise<void> {
    try {
      await this.reviewModel.findById(id).remove();
    } catch (err) {
      console.log('there was a problem retrieving review from db');
    }
  }

  async findById(id: string): Promise<ReviewModel> {
    try {
      return await this.reviewModel.findById(id);
    } catch (err) {
      console.log('there was a problem retrieving review from db');
    }
  }

  async findByIdAndUpdate(id: string, model: EditReviewViewModel): Promise<ReviewModel> {
    try {
      return await this.reviewModel.findByIdAndUpdate(id, model);
    } catch (err) {
      console.log('there was a problem retrieving review from db');
    }
  }

  async findAll(): Promise<ReviewModel[]> {
    return await this.reviewModel.find().exec();
  }
}
