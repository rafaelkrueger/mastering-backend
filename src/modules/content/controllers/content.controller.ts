import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContentService } from '../services';
import { ApiTags } from '@nestjs/swagger';
import { ContentDto } from '../content-dtos';
import {
  CreateNewContentApiDocumentation,
  DeleteContentApiDocumentation,
  GetCourseContentApiDocumentation,
} from '../swagger/content-api-doc-decorator';

@ApiTags('Content')
@Controller('/content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('/:topicId')
  @GetCourseContentApiDocumentation()
  async findContents(@Param('topicId') topicId: string) {
    return await this.contentService.findContentByCourseId(topicId);
  }

  @Post('')
  @CreateNewContentApiDocumentation()
  async createContents(@Body() content: ContentDto) {
    return await this.contentService.createContent(content);
  }

  @Delete('/:contentId')
  @DeleteContentApiDocumentation()
  async deleteContent(@Param('contentId') contentId: string) {
    return await this.contentService.deleteContentById(contentId);
  }
}
