import express from 'express'
import {
  getAllTicketCatalogs,
  createTicketCatalog,
  deleteTicketCatalog,
  updateTicketCatalog,
  getTicketCatalogById
} from '~/controllers/ticketCatalogController'

const ticketCatalogRoutes = express.Router()
ticketCatalogRoutes.get('/ticket-catalogs', getAllTicketCatalogs)
ticketCatalogRoutes.post('/ticket-catalogs', createTicketCatalog)
ticketCatalogRoutes.get('/ticket-catalogs/:id', getTicketCatalogById)
ticketCatalogRoutes.put('/ticket-catalogs/:id', updateTicketCatalog)
ticketCatalogRoutes.delete('/ticket-catalogs/:id', deleteTicketCatalog)

export default ticketCatalogRoutes
