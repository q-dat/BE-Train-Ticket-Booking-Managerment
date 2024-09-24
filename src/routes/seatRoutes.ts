import express from 'express'
import { getSeats, createSeat, deleteSeat, updateSeat, getSeatById } from '../controllers/seatController'

const seatRoutes = express.Router()

seatRoutes.get('/seats', getSeats)
seatRoutes.post('/seats', createSeat)
seatRoutes.get('/seats/:id', getSeatById)
seatRoutes.put('/seats/:id', updateSeat)
seatRoutes.delete('/seats/:id', deleteSeat)

export default seatRoutes
