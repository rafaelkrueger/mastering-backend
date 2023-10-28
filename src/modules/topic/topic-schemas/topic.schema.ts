import * as mongoose from 'mongoose';

export const TopicSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  videoUrl: String,
  files: Array<any>,
  courseRelated: String,
  resources: Array<any>,
  content: Array<any>,
  previous: String,
  next: String,
});
