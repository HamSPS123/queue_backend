import { Test, TestingModule } from '@nestjs/testing';
import { QueueStatusesService } from './queue-statuses.service';

describe('QueueStatusesService', () => {
  let service: QueueStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueStatusesService],
    }).compile();

    service = module.get<QueueStatusesService>(QueueStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
