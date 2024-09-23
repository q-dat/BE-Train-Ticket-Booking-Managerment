import express from 'express'
import { getAllLocations, createLocation, deleteLocation, updateLocation } from '~/controllers/locationController'

const locationRoutes = express.Router()
locationRoutes.get('/locations', getAllLocations)
locationRoutes.post('/locations', createLocation)
locationRoutes.put('/locations/:id', updateLocation)
locationRoutes.delete('/locations/:id', deleteLocation)

export default locationRoutes
