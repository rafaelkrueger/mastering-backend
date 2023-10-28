import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContentDto } from '../content-dtos';
import { TopicService } from 'src/modules/topic/services/topic.service';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel('Content') private readonly contentModel: Model<ContentDto>,
    private readonly topicService: TopicService,
  ) {}

  async findAll(topicId: string) {
    return await this.contentModel.find({ topicRelated: topicId });
  }

  async createContent(newContent: ContentDto) {
    const topic = await this.topicService.findTopicById(
      newContent.topicRelated,
      );
    const lastContent = topic.content[topic.content.length - 1];
    //host pdfm video and image
    const createdContent = await new this.contentModel(newContent);
    if (lastContent) {
      await this.contentModel
        .updateOne({ _id: lastContent._id }, { next: createdContent._id })
        .exec();
      createdContent.previous = lastContent._id;
      topic.content.push(createdContent);
      await topic.save();
      return await createdContent.save();
    } else {
      topic.content.push(createdContent);
      await topic.save();
      return await createdContent.save();
    }
  }

  async findContentByCourseId(topicId: string) {
    return await this.contentModel.find({ topicRelated: topicId });
  }

  async deleteContentById(contentId: string) {
    const deletionResult = await this.contentModel.deleteOne({
      _id: contentId,
    });
    if (deletionResult.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  }
}
