import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export class BudgetCourseDto extends Document {
  id: ObjectId;

  @ApiProperty({ example: '648b0b506c49bb3905001be3' })
  userId: string;

  @ApiProperty({ example: '648b0b506c49bb3905001be3' })
  courseId: string;

  @ApiProperty({
    example: { amount: 25.3, date: '2022-12-27 14:14:07.8730000 +00:00' },
  })
  transactions: Array<{ amount: number; date: Date }>;

  @ApiProperty({
    example: {
      amount: 25.3,
      date: '2022-12-27 14:14:07.8730000 +00:00',
      userId: '648b0b506c49bb3905001be3',
    },
  })
  afiliateTransactions: Array<{ amount: number; date: Date; userId: string }>;

  @ApiProperty({
    example: 93,
  })
  totalAmount: number;

  @ApiProperty({ example: 3 })
  totalTransactions: number;
}
