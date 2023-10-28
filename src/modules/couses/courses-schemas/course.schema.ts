import * as mongoose from 'mongoose';

export const CourseSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  language: String,
  creator: String,
  price: Number,
  category: String,
  type: String,
  modules: Array<any>,
  afiliates: Array<any>,
  costumers: Array<any>,
});
