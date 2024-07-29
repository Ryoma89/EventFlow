import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { connectDB } from '../database';
import Event from '../models/event.model';
dotenv.config();

export const createEvent = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const {
      title,
      description,
      location,
      startDateTime,
      endDateTime,
      imageUrl,
      price,
      isFree,
      url,
      category,
      organizer,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      location,
      startDateTime,
      endDateTime,
      imageUrl,
      price,
      isFree,
      url,
      category,
      organizer,
    });
    return res.status(201).json(event);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const editEvent = async (req: Request, res: Response) => {
  try {
    const {
      eventId,
      title,
      description,
      location,
      startDateTime,
      endDateTime,
      imageUrl,
      price,
      isFree,
      url,
      category,
    } = req.body;

    const event = await Event.findByIdAndUpdate(eventId, {
      title,
      description,
      location,
      startDateTime,
      endDateTime,
      imageUrl,
      price,
      isFree,
      url,
      category,
    });
    return res.status(201).json(event);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
