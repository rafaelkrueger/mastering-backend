import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export class UserDto extends Document {
  id: ObjectId;
  @ApiProperty({ example: 'rafaelkrueger@email.com' })
  email: string;
  @ApiProperty({ example: '99 99999-99999' })
  cellphone: string;
  @ApiProperty({ example: '123456789' })
  password: string;
  @ApiProperty({ example: '999999999999' })
  document: string;
  @ApiProperty({ example: '25/11/2002' })
  birthDate: string;
  @ApiProperty({ example: '99999-999' })
  zipCode: string;
  @ApiProperty({ example: 'Test Street' })
  streetAndNumber: string;
  @ApiProperty({ example: 'Test Region' })
  region: string;
  @ApiProperty({ example: 'Test Region' })
  state: string;
  @ApiProperty({ example: 'Test Country' })
  country: string;
  @ApiProperty({ example: true })
  isTeacher: boolean;
  @ApiProperty({ example: [] })
  myCourse: Array<any>;
  @ApiProperty({ example: [] })
  relatedCourse: Array<any>;
  @ApiProperty({ example: [] })
  afiliatedCourse: Array<any>;
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkY3MDQ...',
  })
  token: string;
}
