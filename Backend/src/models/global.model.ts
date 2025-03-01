import { Schema } from 'mongoose';

export const addressSchema: Schema = new Schema({
  street: { type: String },
  city: { type: String },
  district: { type: String },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String },
},{_id:false});
