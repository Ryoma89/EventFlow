import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import dotenv from 'dotenv';
import { connectDB } from '../database';
dotenv.config();

export const signUp = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'The email is already in use' });
    }

    await User.create({
      email,
      username,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    await connectDB();
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'The email does not exist' });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'The password is incorrect' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   // domain: 'localhost',
    //   // secure: true,
    //   sameSite: 'strict',
    //   maxAge: 3600000,
    // });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'eventflow-backend-stripe.onrender.com',
      maxAge: 3600000,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      domain: 'localhost',
      // secure: true,
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'Sign out successful' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
