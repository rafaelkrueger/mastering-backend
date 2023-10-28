import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user-schemas/user.schema';
import { UserController } from './controllers';
import { Encryption, UserService } from './services';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserProgressSchema } from './user-schemas/user-progress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'UserProgress', schema: UserProgressSchema },
    ]),
    JwtModule.registerAsync({
      imports: [UserModule],
      useFactory: async () => ({
        secret: 'teste123',
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, Encryption, JwtService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
