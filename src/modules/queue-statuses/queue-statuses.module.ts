import { Module } from '@nestjs/common';
import { QueueStatusesService } from './queue-statuses.service';
import { QueueStatusesController } from './queue-statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueStatus } from './entities/queue-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QueueStatus])],
  controllers: [QueueStatusesController],
  providers: [QueueStatusesService],
})
export class QueueStatusesModule {}
