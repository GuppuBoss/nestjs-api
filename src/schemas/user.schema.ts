import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  id: Number,
  name: String,
  username: String,
  password: String,
  email: String,
})