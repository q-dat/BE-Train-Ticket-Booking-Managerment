import express from 'express'
import { createTicket, deleteTicket, getAllTickets, getTicketById,searchTickets,updateTicket } from '~/controllers/ticketController'

const ticketRoutes = express.Router()
ticketRoutes.get('/tickets',getAllTickets)
ticketRoutes.get('/tickets/:id',getTicketById)
ticketRoutes.post('/tickets',createTicket)
ticketRoutes.put('/tickets/:id',updateTicket)
ticketRoutes.delete('/tickets/:id',deleteTicket)
ticketRoutes.get('/ticket/search',searchTickets)

export default ticketRoutes
