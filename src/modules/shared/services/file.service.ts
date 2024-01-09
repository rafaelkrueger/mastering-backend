import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class FileService {
  constructor() {}

  async storeFile(base64String: string): Promise<string> {
    if (base64String) {
      const result = await cloudinary.uploader.upload(base64String, {
        resource_type: 'auto',
      });
      return result.url;
    }
  }
}
