import { ApiProperty } from '@nestjs/swagger';

export class UserLogin {
  @ApiProperty({ example: 'rafaelkrueger@email.com' })
  email: string;
  @ApiProperty({ example: '123456789' })
  password: string;
}
