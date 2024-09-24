import express from 'express';
import { createAge, deleteAge, getAgeById, getAllAge, updateAge } from '~/controllers/ageController';


const AgeRoutes = express.Router();

AgeRoutes.get('/ages', getAllAge);
AgeRoutes.post('/ages', createAge);
AgeRoutes.get('/ages/:id', getAgeById);
AgeRoutes.put('/ages/:id', updateAge);
AgeRoutes.delete('/ages/:id', deleteAge);

export default AgeRoutes;


