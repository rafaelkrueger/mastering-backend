import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from '../services';
import { CreatePixApiDocumentation } from '../swagger';

@ApiTags('Payment')
@Controller('/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/pix/:value')
  @CreatePixApiDocumentation()
  async createCourse(@Param('value') value: any): Promise<any> {
    return await this.paymentService.createPix(value);
  }
}
