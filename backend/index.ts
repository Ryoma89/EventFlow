import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT || 5000;

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
