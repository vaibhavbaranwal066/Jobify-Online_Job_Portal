import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB Database: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Error: ${error}`);
  }
};

export default connectDB;