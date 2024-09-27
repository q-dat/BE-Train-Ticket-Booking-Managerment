import { v2 as cloudinary } from 'cloudinary'

// Configuration
cloudinary.config({ 
  cloud_name: 'laclactrip', 
  api_key: '468986788966958', 
  api_secret: 'CLOUDINARY_URL=cloudinary://468986788966958:YQOlCHSPESbvjVFunInOliAUy8M@laclactrip' 
});
export default cloudinary
