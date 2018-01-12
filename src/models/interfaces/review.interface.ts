import { Document } from 'mongoose';

export interface Review extends Document {
  readonly name: String,
  readonly imageUrl: string,
  readonly description: String,
}
