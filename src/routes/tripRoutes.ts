import express from 'express';
import { getTrips, searchTrips, createTrip, updateTrip, deleteTrip,getTripById } from '../controllers/tripController';

const tripRoutes = express.Router();
tripRoutes.get('/trips', getTrips);
tripRoutes.get('/trips/search', searchTrips);
tripRoutes.get('/trips/:id', getTripById);
tripRoutes.post('/trips', createTrip);
tripRoutes.put('/trips/:id', updateTrip);
tripRoutes.delete('/trips/:id', deleteTrip);

export default tripRoutes;
