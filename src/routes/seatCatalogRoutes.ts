import express from 'express'
import {
  createSeatCatalog,
  deleteSeatCatalog,
  getSeatCatalogById,
  getSeatCataLogs,
  updateSeatCatalog
} from '~/controllers/seatCatalogController'

const seatCatalogRoutes = express.Router()

seatCatalogRoutes.get('/seat-catalogs', getSeatCataLogs)
seatCatalogRoutes.get('/seat-catalogs/:id', getSeatCatalogById)
seatCatalogRoutes.post('/seat-catalogs', createSeatCatalog)
seatCatalogRoutes.put('/seat-catalogs/:id', updateSeatCatalog)
seatCatalogRoutes.delete('/seat-catalogs/:id', deleteSeatCatalog)

export default seatCatalogRoutes