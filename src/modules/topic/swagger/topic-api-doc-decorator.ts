import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { TopicDto } from '../topic-dtos';

export const CreateNewTopicApiDocumentation = () => {
  return applyDecorators(
    ApiBody({
      type: TopicDto,
      required: true,
    }),
    ApiOperation({
      summary: 'Creates new Topic.',
    }),
    ApiCreatedResponse({
      description: 'New Topic created.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};

export const GetCourseTopicsApiDocumentation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all courses Topic by id.',
    }),
    ApiCreatedResponse({
      description: 'All topics returned.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};
