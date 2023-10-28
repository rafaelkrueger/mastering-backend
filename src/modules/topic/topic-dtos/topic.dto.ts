import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export class TopicDto extends Document {
  id: ObjectId;

  @ApiProperty({ example: 'How to start' })
  name: string;
  @ApiProperty({ example: 'this start will be important to you...' })
  description: string;
  @ApiProperty({
    example: 'https://mundoconectado.com.br/uploads/chamadas/capa_145.jpg',
  })
  image: string;

  @ApiProperty({
    example: '6480ae282d9fe2f87fffa505',
  })
  courseRelated: string;

  @ApiProperty({
    example: 'https://www.videvo.net/stock-video-footage/random/',
  })
  videoUrl: string;

  @ApiProperty({ example: [] })
  files: Array<any>;

  @ApiProperty({ example: [] })
  resources: Array<any>;

  @ApiProperty({
    example: [],
  })
  content: Array<any>;

  @ApiProperty({
    example: '',
  })
  previous: string;

  @ApiProperty({
    example: '',
  })
  next: string;
}
