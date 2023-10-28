import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super(`User Already Exists`, HttpStatus.CONFLICT);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super(`This user was not found...`, HttpStatus.NOT_FOUND);
  }
}
