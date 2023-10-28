import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BudgetCourseDto } from '../budget-dtos';
import { CourseService } from 'src/modules/couses/services';

@Injectable()
export class BudgetService {
  constructor(
    @InjectModel('BudgetCourse')
    private readonly budgetCourseModel: Model<BudgetCourseDto>,
    private readonly courseService: CourseService,
  ) {}

  async getTotalAmountByCourse(courseId: string): Promise<BudgetCourseDto> {
    let totalAmount = 0;

    const coursesBudget = await this.budgetCourseModel.findOne({
      courseId: courseId,
    });
    if (!coursesBudget) {
      return null;
    }

    for (const courseTransaction of coursesBudget.transactions) {
      totalAmount = totalAmount + courseTransaction.amount;
    }
    for (const courseTransactionAfiliate of coursesBudget.afiliateTransactions) {
      totalAmount = totalAmount + courseTransactionAfiliate.amount;
    }
    coursesBudget.totalAmount = totalAmount;
    coursesBudget.totalTransactions =
      coursesBudget.transactions.length +
      coursesBudget.afiliateTransactions.length;

    return coursesBudget;
  }

  async incrementCourseTotalAmount(courseId: string) {
    const courseBudget = await this.budgetCourseModel.findOne({
      courseId: courseId,
    });
    const course = await this.courseService.findCourseById(courseId);
    courseBudget.totalAmount = courseBudget.totalAmount + course.course.price;
    courseBudget.totalTransactions = courseBudget.totalTransactions + 1;
    await this.budgetCourseModel
      .updateOne(
        { _id: courseBudget.id },
        {
          totalAmount: courseBudget.totalAmount,
          totalTransactions: courseBudget.totalTransactions,
        },
      )
      .exec();
  }
}
