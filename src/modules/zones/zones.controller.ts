import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Zone } from './entities/zone.entity';
import { DeleteResult } from 'typeorm';

@Controller({ version: '1', path: 'zones' })
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post()
  async create(@Body() createZoneDto: CreateZoneDto): Promise<Zone> {
    const result = await this.zonesService.create(createZoneDto);
    return result;
  }

  @Get()
  async findAll(): Promise<Zone[]> {
    const result = await this.zonesService.findAll();
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Zone> {
    const result = await this.zonesService.findOne(+id);
    return result;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto): Promise<Zone> {
    const result = await this.zonesService.update(+id, updateZoneDto);
    return result;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    const result = await this.zonesService.remove(+id);
    return result;
  }

  @Delete('removeSelected/:ids')
  async removeSeleted(@Param('ids') ids: any): Promise<DeleteResult> {
    const result = await this.zonesService.removeSelected(ids);
    return result;
  }
}
