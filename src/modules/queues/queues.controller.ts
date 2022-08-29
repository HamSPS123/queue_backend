import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { CallQueueDto, CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { Queue } from './entities/queue.entity';

@Controller({ version: '1', path: 'queues' })
export class QueuesController {
  constructor(private readonly queuesService: QueuesService) {}

  @Post()
  async create(@Body() data: CreateQueueDto): Promise<Queue> {
    const result = await this.queuesService.create(data);
    return result;
  }

  @Get()
  async findAll(): Promise<Queue[]> {
    return await this.queuesService.findAll();
  }

  @Get('findOne/:id')
  async findOne(@Param('id') id: string): Promise<Queue> {
    return await this.queuesService.findOne(+id);
  }

  @Get('today')
  async findToday(): Promise<Queue[]> {
    return await this.queuesService.findTody();
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
  async callQueue(@Param('id') id: string, @Body() data: CallQueueDto): Promise<Queue> {
    const result = await this.queuesService.callQueue(+id, data);
    return result;
  }

  @Patch('start/:id')
  async startQueue(@Param('id') id: string): Promise<Queue> {
    const result = await this.queuesService.startQueue(+id);
    return result;
  }

  @Patch('end/:id')
  async endQueue(@Param('id') id: string): Promise<Queue> {
    const result = await this.queuesService.endQueue(+id);
    return result;
  }

  @Patch('cancel/:id')
  async cancel(@Param('id') id: string): Promise<Queue> {
    const result = await this.queuesService.cancel(+id);
    return result;
  }
}
