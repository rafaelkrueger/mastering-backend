import { Module } from '@nestjs/common';
import { PaymentController } from './controllers';
import { PaymentService } from './services';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [],
})
export class PaymentModule {}
