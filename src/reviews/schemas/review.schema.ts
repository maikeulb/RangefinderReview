import { Review } from '../interfaces/review.interface';
import { Document, Schema } from 'mongoose';

export interface ReviewModel extends Review, Document { }

export const ReviewSchema = new Schema({
  name: String,
  imageUrl: String,
  description: String,
});
