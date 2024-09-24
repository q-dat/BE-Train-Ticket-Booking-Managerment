import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db'
import userRoutes from './routes/userRoutes'
import { errorHandler } from './middlewares/errorMiddleware'
import cookieParser from 'cookie-parser'
import path from 'path'
import { endpointsByCategory } from './views/endpointsByCategory'
import locationRoutes from './routes/locationRoutes'
import tripRouter from './routes/tripRoutes'
import chairRoutes from './routes/chairRoutes'
import AgeRoutes from './routes/ageRouter'

dotenv.config()
connectDB()

const app = express()

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
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)

app.use(cookieParser())

app.use(express.json())

app.use('/api/', locationRoutes, tripRouter, chairRoutes,AgeRoutes)
app.use('/api/auth', userRoutes)

// Cấu hình EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('index', { endpointsByCategory })
})

app.use(errorHandler)

export default app
