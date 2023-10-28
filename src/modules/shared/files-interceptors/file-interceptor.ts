import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BadRequestException } from '@nestjs/common';

const MB = (size: number): number => {
  return 1024 * 1024 * size;
};

const imageFileFilter = (
  _req: any,
  file: any,
  callBack: any,
) => {
  const valid = ['image/jpeg', 'image/jpg', 'image/png'];
  if (file && valid.includes(file.mimetype)) {
    callBack(null, true);
  }
};

export const documentFilter = (
  _req: any,
  file: any,
  callBack: any,
) => {
  const valid = ['application/pdf'];
  if (file && valid.includes(file.mimetype)) {
    callBack(null, true);
  }
};

export const buildImageFileInterceptor = (field: string) =>
  FileInterceptor(field, {
    limits: { fileSize: MB(Number('20')) },
    fileFilter: imageFileFilter,
  });

export const buildDocumentFileInterceptor = (field: string) =>
  FileInterceptor(field, {
    limits: { fileSize: MB(Number('100')) },
    fileFilter: documentFilter,
  });

export const buildFilesTypeInterceptor = (field) =>
  FilesInterceptor(field, 10, {
    limits: { fileSize: MB(Number('100000')) },
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(pdf)$/)) {
        return callback(
          new BadRequestException('Only PDF files are allowed!'),
          false,
        );
      }
      callback(null, true);
    },
  });

export const buildDocumentsFilesInterceptor = (fieldName: string) =>
  FilesInterceptor(fieldName, 20, { fileFilter: documentFilter });
