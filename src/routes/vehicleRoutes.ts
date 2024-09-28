import express from 'express'
import {
  createVehicle,
  deleteVehicle,
  getVehicleById,
  getVehicles,
  updateVehicle
} from '~/controllers/vehicleController'

const vehicleRoutes = express.Router()

vehicleRoutes.get('/vehicles', getVehicles),
  vehicleRoutes.get('/vehicles/:id', getVehicleById),
  vehicleRoutes.post('/vehicles', createVehicle),
  vehicleRoutes.put('/vehicles/:id', updateVehicle),
  vehicleRoutes.delete('/vehicles/:id', deleteVehicle)

export default vehicleRoutes
