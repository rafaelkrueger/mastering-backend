import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export class ContentDto extends Document {
  id: ObjectId;

  @ApiProperty({ example: 'Start making products to sell' })
  name: string;
  @ApiProperty({ example: 'this start will be important to you...' })
  description: string;
  @ApiProperty({
    example: 'https://mundoconectado.com.br/uploads/chamadas/capa_145.jpg',
  })
  image: string;

  @ApiProperty({
    example: '648b0b506c49bb3905001be3',
  })
  topicRelated: string;

  @ApiProperty({
    example: 'https://www.videvo.net/stock-video-footage/random/',
  })
  videoUrl: string;

  @ApiProperty({ example: [] })
  files: Array<any>;

  @ApiProperty({ example: [] })
  resources: Array<any>;

  @ApiProperty({
    example: '',
  })
  previous: string;

  @ApiProperty({
    example: '',
  })
  next: string;
}
