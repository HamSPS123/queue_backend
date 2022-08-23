import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  RandomNumber(min, max) {
    const number = Math.floor(Math.random() * (max - min + 1) + min);

    return number;
  }

  prefix(concat: number) {
    let prefix: string;
    const length = concat.toString().length;

    if (length === 3) {
      prefix = '';
    } else if (length === 2) {
      prefix = '0';
    } else {
      prefix = '00';
    }

    const result = prefix + concat;
    return result;
  }
}
