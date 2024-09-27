require('dotenv').config();
const cloudinary =require('cloudinary').v2;
// import { v2 as cloudinary } from 'cloudinary'

// Configuration
cloudinary.config({
  cloud_name: 'laclactrip',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
export default cloudinary
