import * as mongoose from 'mongoose';

export const UserProgressSchema = new mongoose.Schema({
  relatedUser: String,
  relatedCourse: String,
  courseCompleted: Boolean,
  topicCompleted: Array<any>,
  contentCompleted: Array<any>,
});
