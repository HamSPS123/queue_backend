import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceTypesService } from './service-types.service';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';

@Controller({ version: '1', path: 'service-types' })
export class ServiceTypesController {
  constructor(private readonly serviceTypesService: ServiceTypesService) {}

  @Post()
  create(@Body() createServiceTypeDto: CreateServiceTypeDto) {
    return this.serviceTypesService.create(createServiceTypeDto);
  }

  @Get()
  findAll() {
    return this.serviceTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceTypeDto: UpdateServiceTypeDto) {
    return this.serviceTypesService.update(+id, updateServiceTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceTypesService.remove(+id);
  }

  @Delete('removeSelected/:ids')
  async removeSelected(@Param('ids') ids: any) {
    const result = await this.serviceTypesService.removeSelected(ids);
    return result;
  }
}
