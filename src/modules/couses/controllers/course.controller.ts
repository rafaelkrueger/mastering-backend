import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CourseService } from '../services';
import { ApiTags } from '@nestjs/swagger';
import { CourseDto } from '../course-dtos';

@ApiTags('Course')
@Controller('/course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get('')
  async findCourses(): Promise<any> {
    return await this.courseService.findAll();
  }

  @Get('/categories')
  async findCoursesCategories(): Promise<any> {
    return await this.courseService.findAllCategories();
  }

  @Get('/:courseId')
  async findCourseById(@Param('courseId') courseId: string): Promise<any> {
    return await this.courseService.findCourseById(courseId);
  }

  @Post('/enroll')
  async EnrollUserCourses(@Body() body: any) {
    await this.courseService.enrollCourse(body.userId, body.courses);
  }

  @Get('/user/:userId')
  async findUserCourses(@Param('userId') userId: string): Promise<CourseDto[]> {
    return await this.courseService.findUserCourses(userId);
  }
}
