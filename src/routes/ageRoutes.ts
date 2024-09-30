import express from 'express'
import { createAge, deleteAge, getAgeById, getAllAge, updateAge } from '~/controllers/ageController'

const ageRoutes = express.Router()

ageRoutes.get('/ages', getAllAge)
ageRoutes.post('/ages', createAge)
ageRoutes.get('/ages/:id', getAgeById)
ageRoutes.put('/ages/:id', updateAge)
ageRoutes.delete('/ages/:id', deleteAge)

export default ageRoutes
