import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { connectDB } from '../database';
import Event from '../models/event.model';
import Category from '../models/category.model';
dotenv.config();

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
