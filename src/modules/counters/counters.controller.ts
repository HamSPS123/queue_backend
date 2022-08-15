import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountersService } from './counters.service';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';

@Controller({ version: '1', path: 'counters' })
export class CountersController {
  constructor(private readonly countersService: CountersService) {}

  @Post()
  async create(@Body() createCounterDto: CreateCounterDto) {
    const result = await this.countersService.create(createCounterDto);
    return result;
  }

  @Get()
  async findAll() {
    const result = await this.countersService.findAll();
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCounterDto: UpdateCounterDto) {
    const result = await this.countersService.update(+id, updateCounterDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.countersService.remove(+id);
    return result;
  }

  @Delete('removeSelected/:ids')
  async removeSeleted(@Param('ids') ids: any) {
    const result = await this.countersService.removeSelected(ids);
    return result;
  }
}
