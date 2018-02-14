import { Model, model, Document, Schema } from 'mongoose';

export const ReviewSchema = new Schema({
  name: String,
  imageUrl: String,
  description: String,

  author: {
      id: {
          type: Schema.Types.ObjectId,
          ref: 'User'
      },
      username: String
  },

  comments: [
    { 
      type: Schema.Types.ObjectId, 
      ref: 'Comment' 
    }
  ],

  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});
