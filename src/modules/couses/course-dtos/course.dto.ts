import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export class CourseDto extends Document {
  id: ObjectId;

  @ApiProperty({ example: 'New Course Recepits' })
  name: string;
  @ApiProperty({ example: 'This course will help you to improve your...' })
  description: string;
  @ApiProperty({
    example: 'https://mundoconectado.com.br/uploads/chamadas/capa_145.jpg',
  })
  image: string;

  @ApiProperty({ example: 'PT-BR' })
  language: string;

  @ApiProperty({ example: '507f1f77bcf86cd799439011' })
  creator: ObjectId;

  @ApiProperty({ example: 129.9 })
  price: number;

  @ApiProperty({ example: 'Food' })
  category: string;

  @ApiProperty({ example: 'ebook' })
  type: string;

  @ApiProperty({ example: [] })
  modules: Array<any>;

  @ApiProperty({ example: [] })
  afiliates: Array<any>;

  @ApiProperty({ example: [] })
  costumers: Array<any>;
}
