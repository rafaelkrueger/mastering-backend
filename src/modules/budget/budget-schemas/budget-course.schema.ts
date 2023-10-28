import * as mongoose from 'mongoose';

export const BudgetCourseSchema = new mongoose.Schema({
  userId: String,
  courseId: String,
  transactions: Array<{ amount: number; date: Date }>,
  afiliateTransactions: Array<{ amount: number; date: Date; userId: string }>,
  totalAmount: Number,
  totalTransactions: Number,
});
