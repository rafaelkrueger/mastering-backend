import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CourseModule } from './couses/course.module';
import { TopicModule } from './topic/topic.module';
import { ContentModule } from './content/content.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { FileModule } from './shared/shared.module';
import { CloudinaryModule } from 'nestjs-cloudinary';
import { BudgetModule } from './budget/budget.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://rafaelkrueger565:Vidanormal01@cluster0.fvrteau.mongodb.net/
  `),
    UserModule,
    CourseModule,
    TopicModule,
    ContentModule,
    FileModule,
    BudgetModule,
    PaymentModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        ttl: 10000,
        limit: 360000,
      }),
    }),
    CloudinaryModule.forRoot({
      cloud_name: 'tamarin-tech',
      api_key: '739453756319644',
      api_secret: 'vitA4c7VnVj9_5RctBDuRUhocpI',
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
