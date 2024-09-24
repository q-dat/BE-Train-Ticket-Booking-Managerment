import express from 'express';
import {
  getAllAge,
  createAge,
  deleteAge,
  updateAge,
  getAgeById
} from '../controllers/ageController';

const AgeRoutes = express.Router();

AgeRoutes.get('/ages', getAllAge);
AgeRoutes.post('/ages', createAge);
AgeRoutes.get('/ages/:id', getAgeById);
AgeRoutes.put('/ages/:id', updateAge);
AgeRoutes.delete('/ages/:id', deleteAge);

export default AgeRoutes;


