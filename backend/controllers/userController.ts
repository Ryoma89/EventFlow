import { Request, Response } from 'express';
import User from '../models/user.model';
import dotenv from 'dotenv';
import { connectDB } from '../database';
dotenv.config();

export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    await connectDB();
    const user = await User.findById(userId);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { username, photo, userId } = req.body;

    const user = await User.findByIdAndUpdate(userId, {
      username,
      photo,
    });

    return res.status(201).json(user);
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
