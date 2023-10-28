import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminCourseController, CourseController } from './controllers';
import { CourseService } from './services';
import { CourseSchema } from './courses-schemas/course.schema';
import { UserModule } from '../user/user.module';
import { ContentModule } from '../content/content.module';
import { TopicModule } from '../topic/topic.module';
import { FileModule } from '../shared/shared.module';
import { BudgetModule } from '../budget/budget.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
    forwardRef(() => TopicModule),
    UserModule,
    ContentModule,
    FileModule,
  ],
  controllers: [AdminCourseController, CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
