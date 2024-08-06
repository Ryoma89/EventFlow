import { Request, Response } from 'express';
import User from '../models/user.model';
import dotenv from 'dotenv';
import { connectDB } from '../database';
dotenv.config();

export const getUser = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const userId = req.user?.userId

    if(!userId) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json(null);
    } 
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { user } = req.body;

    const updateUser = await User.findByIdAndUpdate(user.userId, {
      username: user.username,
      photo: user.photo,
    }, { new: true });

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
