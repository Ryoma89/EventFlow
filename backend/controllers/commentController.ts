import dotenv from 'dotenv';
import { Request, Response } from 'express';

import { connectDB } from '../database';
import Comment from '../models/comment.model';

dotenv.config();

export const createComment = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { comment, eventId } = req.body;
    const { userId } = req.user;
    const newComment = await Comment.create({
      content: comment,
      user: userId,
      event: eventId,
    });

    return res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    await connectDB();

    const { commentId } = req.body;
    const deleteComment = await Comment.findByIdAndDelete(commentId);
    return res.status(201).json(deleteComment);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
