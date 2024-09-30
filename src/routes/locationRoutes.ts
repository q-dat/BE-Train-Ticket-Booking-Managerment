import express from 'express'
import {
  getAllLocations,
  createLocation,
  deleteLocation,
  updateLocation,
  getLocationById
} from '~/controllers/locationController'

const locationRoutes = express.Router()
locationRoutes.get('/locations', getAllLocations)
locationRoutes.post('/locations', createLocation)
locationRoutes.get('/locations/:id', getLocationById)
locationRoutes.put('/locations/:id', updateLocation)
locationRoutes.delete('/locations/:id', deleteLocation)

export default locationRoutes
