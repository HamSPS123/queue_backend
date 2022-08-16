import { Test, TestingModule } from '@nestjs/testing';
import { QueueStatusesController } from './queue-statuses.controller';
import { QueueStatusesService } from './queue-statuses.service';

describe('QueueStatusesController', () => {
  let controller: QueueStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueStatusesController],
      providers: [QueueStatusesService],
    }).compile();

    controller = module.get<QueueStatusesController>(QueueStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
