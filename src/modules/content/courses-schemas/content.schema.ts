import * as mongoose from 'mongoose';

export const ContentSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  videoUrl: String,
  files: Array<any>,
  topicRelated: String,
  resources: Array<any>,
  previous: String,
  next: String,
});
