import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopicDto } from '../topic-dtos';
import { FileService } from 'src/modules/shared/services/file.service';

@Injectable()
export class TopicService {
  constructor(
    @InjectModel('Topic') private readonly topicModel: Model<TopicDto>,
    private readonly fileService: FileService,
  ) {}

  async findTopicsById(topicId: string) {
    return await this.topicModel.find({ _id: topicId });
  }

  async findTopicsByCourseId(courseId: string) {
    return await this.topicModel.find({ courseRelated: courseId });
  }

  async findTopicById(topicId: string) {
    const topic = await this.topicModel.findOne({ _id: topicId });
    return topic;
  }

  async createTopic(newTopic: TopicDto) {
    const topics = await this.topicModel.find({
      courseRelated: newTopic.courseRelated,
    });
    const createdTopic = await new this.topicModel(newTopic);
    for (const topic of topics) {
      if (topic.next === '') {
        await this.topicModel
          .updateOne({ _id: topic._id }, { next: createdTopic._id })
          .exec();
        createdTopic.previous = topic._id;
      }
    }
    if (createdTopic.videoUrl.length > 0) {
      createdTopic.videoUrl = await this.fileService.storeFile(
        newTopic.videoUrl,
      );
    }
    return await createdTopic.save();
  }
}
