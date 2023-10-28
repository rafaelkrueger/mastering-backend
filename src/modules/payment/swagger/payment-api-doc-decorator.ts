import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';

export const CreatePixApiDocumentation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Creates new Pix.',
    }),
    ApiCreatedResponse({
      description: 'New Pix created.',
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized.' }),
  );
};
