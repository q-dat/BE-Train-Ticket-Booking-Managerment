import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@branches-managerment.d0r1isf.mongodb.net/?retryWrites=true&w=majority&appName=Branches-Managerment`,
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );
    console.log("Kết nối MongoDB thành công.");
  } catch (error) { 
    console.log("error server:" + error);
    process.exit(1);
  }
};

mongoose.connection.on("error", (error) => {
  console.log("error server:" + error);
});

export default connectDB;
