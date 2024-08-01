import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import bookingRoutes from './routes/bookingRoutes';
import commentRoutes from './routes/commentRoutes';
import stripeRoutes from './routes/stripeRoutes';
import cookieParser from 'cookie-parser';

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}
if (!process.env.FRONTEND_URL) {
  throw new Error('FRONTEND_URL is not defined');
}

const app = express();
const port = Number(process.env.BACKEND_PORT) || 5000;

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

app.use(cookieParser());
app.use('/api/stripe', stripeRoutes);
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', eventRoutes);
app.use('/api', bookingRoutes);
app.use('/api', commentRoutes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
