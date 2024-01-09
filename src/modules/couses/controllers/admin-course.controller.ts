import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CourseService } from '../services';
import { ApiTags } from '@nestjs/swagger';
import { CourseDto } from '../course-dtos';
import {
  CreateNewCourseApiDocumentation,
  DeleteCourseApiDocumentation,
  GetCourseByUserIdApiDocumentation,
} from '../swagger';

@ApiTags('Admin Course')
@Controller('/admin/course')
export class AdminCourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('/:userId')
  @GetCourseByUserIdApiDocumentation()
  async findUserCourses(@Param('userId') userId: string): Promise<CourseDto[]> {
    return await this.courseService.findCourseByUser(userId);
  }

  @Post('/')
  @CreateNewCourseApiDocumentation()
  async createNewCourse(@Body() body: any): Promise<void> {
    await this.courseService.createCourse(body);
  }

  @Patch('/')
  async updateCourse(@Body() body: CourseDto): Promise<void> {
    await this.courseService.updateCourse(body);
  }

  @Delete('/:courseId')
  @DeleteCourseApiDocumentation()
  async deleteCourse(@Param('courseId') courseId: string): Promise<void> {
    return await this.courseService.deleteCourse(courseId);
  }
}
