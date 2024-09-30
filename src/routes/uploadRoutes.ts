import express from 'express'
import { uploadFile } from '../controllers/uploadController' // Import controller

const fileUploader = require('../config/cloudinary')
const uploadRoutes = express.Router()

// Sử dụng controller cho route
uploadRoutes.post('/uploads', fileUploader.single('file'), uploadFile)

export default uploadRoutes
