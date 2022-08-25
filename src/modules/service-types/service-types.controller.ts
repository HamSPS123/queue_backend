import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceTypesService } from './service-types.service';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';
import { ServiceType } from './entities/service-type.entity';
import { DeleteResult } from 'typeorm';

@Controller({ version: '1', path: 'service-types' })
export class ServiceTypesController {
  constructor(private readonly serviceTypesService: ServiceTypesService) {}

  @Post()
  async create(@Body() createServiceTypeDto: CreateServiceTypeDto): Promise<ServiceType> {
    const result = await this.serviceTypesService.create(createServiceTypeDto);
    return result;
  }

  @Get()
  async findAll(): Promise<ServiceType[]> {
    const result = await this.serviceTypesService.findAll();
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ServiceType> {
    const result = await this.serviceTypesService.findOne(+id);
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateServiceTypeDto: UpdateServiceTypeDto): Promise<ServiceType> {
    const result = await this.serviceTypesService.update(+id, updateServiceTypeDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    const result = await this.serviceTypesService.remove(+id);
    return result;
  }

  @Delete('removeSelected/:ids')
  async removeSelected(@Param('ids') ids: any): Promise<DeleteResult> {
    const result = await this.serviceTypesService.removeSelected(ids);
    return result;
  }
}
