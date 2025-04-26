import dotenv from 'dotenv';
import path from 'path';

// Determine which .env file to load
const envFile = path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`);
// dotenv.config();
dotenv.config({ path: envFile });

export const BASE_PATH = process.env.BASE_PATH as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const MONGO_URI = process.env.MONGO_URI as string;
export const NODE_ENV = process.env.NODE_ENV as string;
export const PORT = process.env.PORT || 5000;
export const SMS_API_KEY = process.env.SMS_API_KEY as string;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME as string;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string;
export const GMAIL_USER = process.env.GMAIL_USER as string;
export const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD as string;



