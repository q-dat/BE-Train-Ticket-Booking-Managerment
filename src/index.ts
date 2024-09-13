import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import config from './config/server/config.services'
import connectDB from './config/database/db.config'
import multer from 'multer'
// import cloudinary from './utils/cloudiary/cloudinary';
// import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

dotenv.config()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// Test upload Cloudinary
// const image = './diagrams/flow-erd/erd.png';
// cloudinary.uploader.upload(image)
//   .then((result: UploadApiResponse) => console.log(result.secure_url))
//   .catch((error: UploadApiErrorResponse) => console.error(error));

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.get('/', async (req, res) => {
  res.send('hello world')
})
app.listen(config.PORT, () => {
  console.log(`Đang chạy port: ${config.PORT}`)
})
