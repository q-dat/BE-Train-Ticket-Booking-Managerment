require('dotenv').config()
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

// Configuration
cloudinary.config({
  cloud_name: 'laclactrip',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

interface File {
  originalname: string
  // Thêm các thuộc tính khác nếu cần
}

// Khởi tạo CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  filename: (req: Request, file: File, cb: (error: any, filename?: string) => void) => {
    cb(null, file.originalname)
  }
})

const uploadCloud = multer({ storage })

module.exports = uploadCloud
