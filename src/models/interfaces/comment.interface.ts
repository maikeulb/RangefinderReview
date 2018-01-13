import { Document, Schema } from 'mongoose';

export interface Comment extends Document {
  text: String,
  createdAt: Date,
  author: Author,
}

interface Author {
  id: Schema.Types.ObjectId;
  username: string;
}
