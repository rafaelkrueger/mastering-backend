import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TopicService } from '../services/topic.service';
import { TopicDto } from '../topic-dtos';
import { CreateNewTopicApiDocumentation } from '../swagger';

@ApiTags('Admin Topic')
@Controller('/admin/topic')
export class AdminTopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get('/:courseId')
  async findCourseTopics(
    @Param('courseId') courseId: string,
  ): Promise<TopicDto[]> {
    return await this.topicService.findTopicsById(courseId);
  }

  @Get('topic/:topicId')
  async findTopicById(@Param('topicId') topicId: string): Promise<TopicDto> {
    return await this.topicService.findTopicById(topicId);
  }

  @Post('')
  @CreateNewTopicApiDocumentation()
  async create(@Body() topic: TopicDto) {
    return await this.topicService.createTopic(topic);
  }
}
