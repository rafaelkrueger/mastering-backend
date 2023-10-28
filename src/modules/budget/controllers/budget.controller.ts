import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BudgetService } from '../services';

@ApiTags('Budget')
@Controller('admin/budget')
export class BudgetCourseController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get('/:courseId')
  async findContents(@Param('courseId') courseId: string) {
    return await this.budgetService.getTotalAmountByCourse(courseId);
  }
}
