import { Injectable } from '@nestjs/common';
import { CreateQueueStatusDto } from './dto/create-queue-status.dto';
import { UpdateQueueStatusDto } from './dto/update-queue-status.dto';

@Injectable()
export class QueueStatusesService {
  create(createQueueStatusDto: CreateQueueStatusDto) {
    return 'This action adds a new queueStatus';
  }

  findAll() {
    return `This action returns all queueStatuses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} queueStatus`;
  }

  update(id: number, updateQueueStatusDto: UpdateQueueStatusDto) {
    return `This action updates a #${id} queueStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} queueStatus`;
  }
}
