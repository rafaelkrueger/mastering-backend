import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicService } from './services/topic.service';
import { TopicSchema } from './topic-schemas/topic.schema';
import { CourseModule } from '../couses/course.module';
import { AdminTopicController } from './controllers';
import { FileModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Topic', schema: TopicSchema }]),
    forwardRef(() => CourseModule),
    FileModule
  ],
  controllers: [AdminTopicController],
  providers: [TopicService],
  exports: [TopicService],
})
export class TopicModule {}
