import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const port = process.env.BACKEND_PORT || 5000;

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
