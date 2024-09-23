import express from 'express';
import { getTrips, searchTrips, createTrip, updateTrip, deleteTrip,getTripById } from '../controllers/tripController';

const tripRouter = express.Router();
tripRouter.get('/trips', getTrips);
tripRouter.get('/trips/search', searchTrips);
tripRouter.get('/trips/:id', getTripById);
tripRouter.post('/trips', createTrip);
tripRouter.put('/trips/:id', updateTrip);
tripRouter.delete('/trips/:id', deleteTrip);

export default tripRouter;
