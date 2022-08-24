import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Zone } from './entities/zone.entity';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone)
    private zonesRepository: Repository<Zone>,
  ) {}
  async create(createZoneDto: CreateZoneDto): Promise<Zone> {
    try {
      const result = await this.zonesRepository.save(createZoneDto);

      if (result) {
        const newData = this.findOne(result.id);
        return newData;
      }
    } catch (error) {
      if (error.errno === 1062) throw new BadRequestException('ລະຫັດຂອງໂຊນຊ້ຳກັນ');
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Zone[]> {
    try {
      const result = await this.zonesRepository.find({ relations: ['serviceType'] });
      if (result) return result;

      throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.message, error.status);
      }
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Zone> {
    try {
      const result = await this.zonesRepository.findOne({ where: { id: id }, relations: ['serviceType'] });
      if (result) {
        return result;
      }
      throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.message, error.status);
      }
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateZoneDto: UpdateZoneDto): Promise<Zone> {
    try {
      const result = await this.zonesRepository.update(id, updateZoneDto);

      if (result.affected) {
        const updateData = await this.findOne(id);

        return updateData;
      }
      throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.message, error.status);
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      const result = await this.zonesRepository.delete(id);
      if (result) return result;

      throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
    } catch (error) {
      if (error.status) throw new HttpException(error.message, error.status);

      throw new BadRequestException(error.message);
    }
  }
}
