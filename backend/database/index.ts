import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) return new Error('MONGODB_URI is missing');

  cached.promise =
    cached.promise ||
    mongoose
      .connect(MONGODB_URI, {
        dbName: 'eventflow',
        bufferCommands: false,
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        throw error;
      });

  cached.conn = await cached.promise;
  return cached.conn;
};
