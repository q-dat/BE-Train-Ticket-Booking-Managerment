import express from 'express';
import {
  getChairs,
  createChair,
  deleteChair,
  updateChair,
  getChairById
} from '../controllers/chairController';

const chairRoutes = express.Router();

chairRoutes.get('/chairs', getChairs);
chairRoutes.post('/chairs', createChair);
chairRoutes.get('/chairs/:id', getChairById);
chairRoutes.put('/chairs/:id', updateChair);
chairRoutes.delete('/chairs/:id', deleteChair);

export default chairRoutes;
