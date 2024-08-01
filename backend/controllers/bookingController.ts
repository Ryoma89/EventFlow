import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { connectDB } from '../database';
import Booking from '../models/booking.model';

dotenv.config();

export const createBooking = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { eventId, userId, stripeId, totalAmount } = req.body;
    const newBooking = await Booking.create({
      event: eventId,
      buyer: userId,
      stripeId,
      totalAmount,
    });

    return res.status(201).json(newBooking);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
