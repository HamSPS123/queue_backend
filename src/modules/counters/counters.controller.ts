import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { CountersService } from './counters.service';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';
import { Counter } from './entities/counter.entity';

@Controller({ version: '1', path: 'counters' })
export class CountersController {
  constructor(private readonly countersService: CountersService) {}

  @Post()
  async create(@Body() createCounterDto: CreateCounterDto): Promise<Counter> {
    const result = await this.countersService.create(createCounterDto);
    return result;
  }

  @Get()
  async findAll(): Promise<Counter[]> {
    const result = await this.countersService.findAll();
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Counter> {
    return this.countersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCounterDto: UpdateCounterDto): Promise<Counter> {
    const result = await this.countersService.update(+id, updateCounterDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    const result = await this.countersService.remove(+id);
    return result;
  }

  @Delete('removeSelected/:ids')
  async removeSeleted(@Param('ids') ids: any): Promise<DeleteResult> {
    const result = await this.countersService.removeSelected(ids);
    return result;
  }

  @Get('zone/:id')
  async findFromZone(@Param('id') id: string): Promise<Counter[]> {
    const result = await this.countersService.findFromZone(+id);
    return result;
  }

  @Patch('status/:id')
  async updateStatus(@Param('id') id: string): Promise<Counter> {
    const result = await this.countersService.updateStatus(+id);
    return result;
  }
}
