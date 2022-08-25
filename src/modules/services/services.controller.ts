import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { DeleteResult } from 'typeorm';

@Controller({ version: '1', path: 'services' })
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    const result = await this.servicesService.create(createServiceDto);
    return result;
  }

  @Get()
  async findAll(): Promise<Service[]> {
    const result = await this.servicesService.findAll();
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Service> {
    const result = await this.servicesService.findOne(+id);
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto): Promise<Service> {
    const result = await this.servicesService.update(+id, updateServiceDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    const result = await this.servicesService.remove(+id);
    return result;
  }

  @Delete('removeSelected/:ids')
  async removeSelected(@Param('ids') ids: any): Promise<DeleteResult> {
    const result = await this.servicesService.removeSelected(ids);
    return result;
  }
}
