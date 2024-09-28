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
import tripRoutes from './routes/tripRoutes'
import chairRoutes from './routes/seatRoutes'
import ticketCatalogRoutes from './routes/ticketCatalogRoutes'
import ageRoutes from './routes/ageRoutes'
import postRoutes from './routes/postRoutes'
import postCatalogRoutes from './routes/postCatalogRoutes'
import uploadRoutes from './routes/uploadRoutes'
import seatCatalogRoutes from './routes/seatCatalogRoutes'
import vehicleRoutes from './routes/vehicleRoutes'

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

app.use('/api/auth', userRoutes)
app.use(express.json())
app.use('/api/', tripRoutes)
app.use('/api/', chairRoutes)
app.use('/api/', ticketCatalogRoutes)
app.use('/api/', ageRoutes)
app.use('/api/', locationRoutes)
app.use('/api/', postRoutes)
app.use('/api/', postCatalogRoutes)
app.use('/api/', uploadRoutes)
app.use('/api/', seatCatalogRoutes)
app.use('/api/', vehicleRoutes)

// Cấu hình EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
  res.render('index', { endpointsByCategory })
})

app.use(errorHandler)

export default app
