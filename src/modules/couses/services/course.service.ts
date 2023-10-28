import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseDto } from '../course-dtos';
import { UserDto } from 'src/modules/user/user-dtos';
import { UserService } from 'src/modules/user/services';
import { TopicService } from 'src/modules/topic/services/topic.service';
import { ContentService } from 'src/modules/content/services';
import { FileService } from 'src/modules/shared/services';
import { BudgetService } from 'src/modules/budget/services';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<CourseDto>,
    private readonly userService: UserService,
    private readonly topicService: TopicService,
    private readonly contentService: ContentService,
    private readonly fileService: FileService,
  ) {}

  async findAll() {
    return await this.courseModel.find();
  }

  async findAllCategories() {
    return await this.courseModel.aggregate([
      {
        $group: {
          _id: '$category', // Grouping field (replace 'category' with the actual field name in your schema).
        },
      },
      {
        $project: {
          _id: 0, // Exclude the "_id" field from the output.
          category: '$_id', // Rename the "_id" field to "category".
        },
      },
    ]);
  }

  async findSpecificCourseById(courseId: string) {
    return await this.courseModel.findOne({ _id: courseId });
  }

  async findCourseById(courseId: string) {
    const course = await this.courseModel.findOne({ _id: courseId });
    const relatedTopics = await this.topicService.findTopicsByCourseId(
      courseId,
    );
    const relatedContent = [];
    for (const relatedTopic of relatedTopics) {
      const singleContent = await this.contentService.findContentByCourseId(
        relatedTopic._id,
      );
      relatedContent.push(singleContent);
    }
    return {
      course: course,
      topic: relatedTopics,
      content: relatedContent,
    };
  }

  async findCourseByUser(userId: string): Promise<CourseDto[]> {
    return await this.courseModel.find({ creator: userId });
  }

  async createCourse(course: any) {
    const user = await this.userService.findByToken(course.token);
    const link = await this.fileService.storeFile(course.image);

    const createdCourse = await new this.courseModel(course);
    createdCourse.creator = user._id;
    createdCourse.image = link;
    return await createdCourse.save();
  }

  async deleteCourse(courseId: string) {
    await this.courseModel.deleteOne({
      _id: courseId,
    });
  }

  async enrollCourse(userId: string, coursesId: string[]) {
    const user = await this.userService.findById(userId);
    for (const courseId of coursesId) {
      const course = await this.courseModel.findOne({
        _id: courseId,
      });
      if (course) {
        // await this.budgetService.incrementCourseTotalAmount(course.id)
        Logger.log(`User ${user.email} enrolled to course ${course.name}`)
        await user.relatedCourse.push(course.id);
      }
      await user.save();
    }
  }

  async findUserCourses(userId: string) {
    const user = await this.userService.findById(userId);
    const userCourses = [];
    for (const courseId of user.relatedCourse) {
      const course = await this.courseModel.findOne({
        _id: courseId,
      });
      userCourses.push(course);
    }
    return userCourses;
  }
}
