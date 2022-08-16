import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QueueStatusesService } from './queue-statuses.service';
import { CreateQueueStatusDto } from './dto/create-queue-status.dto';
import { UpdateQueueStatusDto } from './dto/update-queue-status.dto';

@Controller('queue-statuses')
export class QueueStatusesController {
  constructor(private readonly queueStatusesService: QueueStatusesService) {}

  @Post()
  create(@Body() createQueueStatusDto: CreateQueueStatusDto) {
    return this.queueStatusesService.create(createQueueStatusDto);
  }

  @Get()
  findAll() {
    return this.queueStatusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queueStatusesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQueueStatusDto: UpdateQueueStatusDto) {
    return this.queueStatusesService.update(+id, updateQueueStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queueStatusesService.remove(+id);
  }
}
