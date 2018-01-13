import { Model, model, Document, Schema } from 'mongoose';

export const ReviewSchema = new Schema({
  name: String,
  imageUrl: String,
  description: String,
  createdAt: { type: Date, default: Date.now },

  author: {
      id: {
          type: Schema.Types.ObjectId,
          ref: 'User'
      },
      username: String
  },

  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});
