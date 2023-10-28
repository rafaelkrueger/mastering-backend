import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { ContentDto } from '../content-dtos';

export const CreateNewContentApiDocumentation = () => {
  return applyDecorators(
    ApiBody({
      type: ContentDto,
      required: true,
    }),
    ApiOperation({
      summary: 'Creates new Content.',
    }),
    ApiCreatedResponse({
      description: 'New Topic created.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};

export const GetCourseContentApiDocumentation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all Contents by id.',
    }),
    ApiCreatedResponse({
      description: 'All Contents returned.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};

export const DeleteContentApiDocumentation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Deletes content by id.',
    }),
    ApiCreatedResponse({
      description: 'Content Deleted.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};
