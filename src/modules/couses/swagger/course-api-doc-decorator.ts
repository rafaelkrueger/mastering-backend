import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { CourseDto } from '../course-dtos';

export const CreateNewCourseApiDocumentation = () => {
  return applyDecorators(
    ApiBody({
      type: CourseDto,
      required: true,
    }),
    ApiOperation({
      summary: 'Creates new Course.',
    }),
    ApiCreatedResponse({
      description: 'New Course created.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};

export const GetAllCourseApiDocumentation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all Courses.',
    }),
    ApiCreatedResponse({
      description: 'Get All Courses created.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};

export const GetCourseByUserIdApiDocumentation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get course by userId Courses.',
    }),
    ApiCreatedResponse({
      description: 'User Courses Returned successfully.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};

export const DeleteCourseApiDocumentation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Deletes specific Course.',
    }),
    ApiCreatedResponse({
      description: 'Courses Deleted.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};
