import { Model, model, Document, Schema } from 'mongoose';

export const CommentSchema = new Schema({
  comment: String,
  createdAt: { type: Date, default: Date.now },

  author: {
      id: {
          type: Schema.Types.ObjectId,
          ref: 'User',
      },
      username: String,
  },

});
