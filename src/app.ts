import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorMiddleware';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes); // Định nghĩa route

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(errorHandler); // Middleware xử lý lỗi

export default app;
