import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middlewares/errorMiddleware';
import cookieParser from 'cookie-parser';
import path from 'path';
import { endpointsByCategory } from './views/endpointsByCategory';

dotenv.config();
connectDB();

const app = express();

// Cấu hình CORS
// const allowedOrigins = ['https://user.example.com', 'https://dashboard.example.com'];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));
app.use(cors({
  origin: 'http://localhost:5173', // Địa chỉ frontend
  credentials: true,  // Để cho phép cookie được gửi
}));


app.use(cookieParser())

app.use(express.json());

app.use('/api/auth', userRoutes);

// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index', { endpointsByCategory });
});


app.use(errorHandler);

export default app;
