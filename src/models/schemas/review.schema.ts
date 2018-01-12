// import { IReview } from '../interfaces/review.interface';
import { Model, model, Document, Schema } from 'mongoose';

// export interface ReviewModel extends IReview, Document { }

export const ReviewSchema = new Schema({
  name: String,
  imageUrl: String,
  description: String,
});

// export const Review: Model<ReviewModel> = model<ReviewModel>('Review', ReviewSchema);
