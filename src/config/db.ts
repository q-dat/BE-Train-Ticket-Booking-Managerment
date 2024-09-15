require('dotenv').config();
import mongoose from 'mongoose';

const mongoURL = process.env.MONGO_URL as string;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log('MongoDB connected successfully');
  } catch (err) {
    if (err instanceof Error) {
      console.error('MongoDB connection error:', err.message);
    } else {
      console.error('MongoDB connection error:', err);
    }
    process.exit(1);
  }
};

export default connectDB;
