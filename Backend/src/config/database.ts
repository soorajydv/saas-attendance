import mongoose from 'mongoose';
import { MONGO_URI, NODE_ENV } from './env.cofig';

export const connectDB = async () => {
  try {
    console.log("MONF>GO URO: ", MONGO_URI);
    await mongoose.connect(MONGO_URI, );
    console.log(`MongoDB connected in ${NODE_ENV} mode`);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};
