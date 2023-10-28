import { Module } from '@nestjs/common';
import { AdminNotificationService } from './services';

@Module({
  imports: [],
  controllers: [],
  providers: [AdminNotificationService],
  exports: [],
})
export class NotificationModule {}
