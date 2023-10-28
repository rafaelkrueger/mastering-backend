import { Module } from '@nestjs/common';
import { FileService } from './services';

@Module({
  imports: [],
  controllers: [],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
