import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentSchema } from './courses-schemas/content.schema';
import { ContentService } from './services';
import { ContentController } from './controllers';
import { TopicModule } from '../topic/topic.module';
import { FileModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Content', schema: ContentSchema }]),
    TopicModule,
    FileModule
  ],
  controllers: [ContentController],
  providers: [ContentService],
  exports: [ContentService],
})
export class ContentModule {}
