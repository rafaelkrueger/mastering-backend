import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContentDto } from '../content-dtos';
import { TopicService } from 'src/modules/topic/services/topic.service';
import { FileService } from 'src/modules/shared/services';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel('Content') private readonly contentModel: Model<ContentDto>,
    private readonly topicService: TopicService,
    private readonly fileService: FileService,
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
    console.log(newContent.files.length);
    const createdContent = await new this.contentModel(newContent);
    const linkImage = await this.fileService.storeFile(newContent.image);
    const linkVideo = await this.fileService.storeFile(newContent.videoUrl);
    createdContent.image = linkImage;
    createdContent.videoUrl = linkVideo;
    const allFiles = [];
    if (newContent.files.length > 0) {
      for (const file of newContent.videoUrl) {
        allFiles.push(await this.fileService.storeFile(file));
      }
    }
    createdContent.image = linkImage;
    createdContent.videoUrl = linkVideo;
    createdContent.files = allFiles;

    if (lastContent) {
      await this.contentModel
      .updateOne({ _id: lastContent._id }, { next: createdContent._id })
      .exec();
      createdContent.previous = lastContent._id;
      topic.content.push(createdContent);
      await topic.save();
      return await createdContent.save();
    } else {
      console.log(createdContent)
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
