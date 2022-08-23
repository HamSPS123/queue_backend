import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { CallQueueDto, CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';

@Controller({ version: '1', path: 'queues' })
export class QueuesController {
  constructor(private readonly queuesService: QueuesService) {}

  @Post()
  async create(@Body() data: CreateQueueDto) {
    const result = await this.queuesService.create(data);
    return result;
  }

  @Get()
  findAll() {
    return this.queuesService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return this.queuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQueueDto: UpdateQueueDto) {
    return this.queuesService.update(+id, updateQueueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queuesService.remove(+id);
  }

  @Get('display')
  display() {
    return this.queuesService.display();
  }

  @Patch('call/:id')
  async callQueue(@Param('id') id: string, @Body() data: CallQueueDto) {
    const result = await this.queuesService.callQueue(+id, data);
    return result;
  }

  @Patch('start/:id')
  async startQueue(@Param('id') id: string) {
    const result = await this.queuesService.startQueue(+id);
    return result;
  }

  @Patch('end/:id')
  async endQueue(@Param('id') id: string) {
    const result = await this.queuesService.endQueue(+id);
    return result;
  }

  @Patch('cancel/:id')
  async cancel(@Param('id') id: string) {
    const result = await this.queuesService.cancel(+id);
    return result;
  }
}
