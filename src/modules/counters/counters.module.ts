import { Module } from '@nestjs/common';
import { CountersService } from './counters.service';
import { CountersController } from './counters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Counter } from './entities/counter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Counter])],
  controllers: [CountersController],
  providers: [CountersService],
})
export class CountersModule {}
