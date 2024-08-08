import { Request, Response } from 'express';
import User from '../models/user.model';
import dotenv from 'dotenv';
import { connectDB } from '../database';
dotenv.config();

import jwt from 'jsonwebtoken';

export const getUser = async (req: Request, res: Response) => {
  await connectDB();

  const tokenFromCookie = req.cookies.token;

  const tokenFromHeader = req.headers.authorization?.split(' ')[1];

  const token = tokenFromCookie || tokenFromHeader;
  if (!token) {
    return res.json(null);
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = decoded.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(null);
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { user } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      user.userId,
      {
        username: user.username,
        photo: user.photo,
      },
      { new: true }
    );

    return res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { userId } = req.body;
    const deleteUser = await User.findByIdAndDelete(userId);
    return res.status(201).json(deleteUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
