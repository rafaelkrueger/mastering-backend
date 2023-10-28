import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  cellphone: String,
  password: String,
  document: String,
  birthDate: String,
  zipCode: String,
  streetAndNumber: String,
  region: String,
  state: String,
  country: String,
  isTeacher: Boolean,
  myCourse: Array<any>,
  relatedCourse: Array<any>,
  afiliatedCourse: Array<any>,
  token: String,
});
