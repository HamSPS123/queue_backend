import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'ຍິນດີຕ້ອນຮັບສູ່ລະບົບກົດຄິວ';
  }
}
