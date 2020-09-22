import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  property: string[];

  constructor(message: string, property?: string[]) {
    super(message, HttpStatus.NOT_FOUND);
    this.property = property || [];
  }
}
