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

    const attendees = await Booking.find({ event: eventId }).populate('user');

    const comments = await Comment.find({ event: eventId }).populate('user');

    return res.status(200).json({ event, attendees, comments });
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
