import jwt, { JwtPayload } from 'jsonwebtoken';
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

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: '15m',
      }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: '7d',
      }
    );

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
    res.clearCookie('refreshToken', {
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

export const refreshToken = async (req: Request, res: Response) => {
  let refreshToken;
  if (req.cookies.refreshToken) {
    refreshToken = req.cookies.refreshToken;
  } else {
    refreshToken = req.headers.authorization?.split(' ')[1];
  }
  if (!refreshToken)
    return res.status(401).json({ message: 'No refresh token provided' });

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as JwtPayload;

    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '15m',
      }
    );

    res.cookie('token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      // domain: 'localhost',
      // secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({
      message: 'Invalid Refresh Token',
    });
  }
};
