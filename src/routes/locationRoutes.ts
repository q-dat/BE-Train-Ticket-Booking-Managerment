import express from 'express'
import { getAllLocations,createLocation } from '~/controllers/locationController'

const locationRoutes = express.Router()
locationRoutes.get('/locations', getAllLocations)
locationRoutes.post('/locations', createLocation)

export default locationRoutes
