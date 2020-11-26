import { Injectable } from '@nestjs/common';

@Injectable()
export class SimpleProvider {
  sayHello = () => {
    return 'Hello from simple provider';
  };
}
