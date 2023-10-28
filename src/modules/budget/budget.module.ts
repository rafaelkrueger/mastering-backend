import { Module } from '@nestjs/common';
import { BudgetCourseSchema } from './budget-schemas/budget-course.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { BudgetService } from './services';
import { BudgetCourseController } from './controllers';
import { CourseService } from '../couses/services';
import { CourseModule } from '../couses/course.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BudgetCourse', schema: BudgetCourseSchema },
    ]),
    CourseModule,
  ],
  controllers: [BudgetCourseController],
  providers: [BudgetService],
  exports: [BudgetService],
})
export class BudgetModule {}
