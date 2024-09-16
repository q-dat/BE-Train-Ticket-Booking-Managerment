require('dotenv').config();
import mongoose from 'mongoose';

const mongoURL = process.env.MONGO_URL as string;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('Kết nối MongoDB thành công');
  } catch (err) {
    if (err instanceof Error) {
      console.error('Lỗi kết nối MongoDB:', err.message);
    } else {
      console.error('Lỗi kết nối MongoDB:', err);
    }
    process.exit(1);
  }
};

export default connectDB;
