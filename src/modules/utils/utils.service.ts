import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  RandomNumber(min, max) {
    const number = Math.floor(Math.random() * (max - min + 1) + min);

    return number;
  }
}
