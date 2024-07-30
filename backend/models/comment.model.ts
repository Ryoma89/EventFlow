import { Schema, model, models, Document } from 'mongoose';

export interface IComment extends Document {
  user: string;
  event: string;
  content: string;
  createdAt: Date;
}

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;
