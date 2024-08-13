import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { connectDB } from '../database';
import Event from '../models/event.model';
import Category from '../models/category.model';
import Booking from '../models/booking.model';
import Comment from '../models/comment.model';

dotenv.config();

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const events = await Event.find({})
      .populate('category')
      .populate('organizer');
    return res.status(200).json(events);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getTrendingEvents = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const trendingEvents = await Booking.aggregate([
      {
        $group: {
          _id: '$event',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 }, 
      },
      {
        $lookup: {
          from: 'events', 
          localField: '_id',
          foreignField: '_id',
          as: 'eventDetails',
        },
      },
      {
        $unwind: '$eventDetails', 
      },
      {
        $project: {
          _id: 0,
          eventId: '$_id',
          count: 1,
          event: '$eventDetails', 
        },
      },
    ]);
    return res.status(200).json(trendingEvents);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to get events' });
  }
}

export const getMyEvents = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const user = req.user;
    const myEvents = await Event.find({ organizer: user.userId });
    return res.status(200).json(myEvents);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to get events' });
  }
}

export const getMyAttendingEvents = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const user = req.user;
    const myEvents = await Booking.find({ buyer: user.userId }).populate('event');
    return res.status(200).json(myEvents);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to get events' });
  }
}

export const getEventById = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { eventId } = req.params;

    if (!eventId)
      return res.status(400).json({ message: 'Event ID is required' });

    const event = await Event.findById(eventId)
      .populate('category')
      .populate('organizer');

    if (!event) return res.status(404).json({ message: 'Event is not found' });

    const buyer = await Booking.find({ event: eventId }).populate('buyer');

    const attendees = buyer.map((b) => b.buyer);

    const comments = await Comment.find({ event: eventId }).populate('user');

    return res.status(200).json({ event,attendees, comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to get event' });
  }
};
export const createEvent = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { event } = req.body;

    const category = await Category.findOne({ name: event.category });

    const categoryId = category._id;

    const newEvent = await Event.create({
      ...event,
      category: categoryId,
    });
    return res.status(201).json(newEvent);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const editEvent = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { event, eventId } = req.body;

    const category = await Category.findOne({ name: event.category });

    const categoryId = category._id;

    const UpdateEvent = await Event.findByIdAndUpdate(eventId, {
      ...event,
      category: categoryId,
    });
    return res.status(201).json(UpdateEvent);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { eventId } = req.body;

    const deleteEvent = await Event.findByIdAndDelete(eventId);
    return res.status(201).json(deleteEvent);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
