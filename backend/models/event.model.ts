import { Document, model, models, Schema } from 'mongoose';

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  startDateTime: Date;
  endDateTime: Date;
  imageUrl: string;
  price?: string;
  isFree: boolean;
  url?: string;
  createdAt: Date;
  category: { _id: string; name: string };
  organizer: { _id: string; username: string };
}

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  startDateTime: {
    type: Date,
    default: Date.now,
  },
  endDateTime: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Event = models.Event || model('Event', EventSchema);

export default Event;
