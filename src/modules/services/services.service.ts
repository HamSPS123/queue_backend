import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    try {
      const result = await this.serviceRepository.save(createServiceDto);

      if (result) {
        const newData = this.findOne(result.id);
        return newData;
      } else {
        throw new NotFoundException('ບໍ່ພົບຜູ້ໃຊ້');
      }
    } catch (error) {
      if (error.errno == 1062) {
        throw new HttpException('ລະຫັດບໍ່ສາມາດຊ້ຳກັນໄດ້ ກະລຸນາລອງໃໝ່', HttpStatus.CONFLICT);
      }
      throw new InternalServerErrorException(error); // error 400
    }
  }

  async findAll(): Promise<Service[]> {
    try {
      const selectField = [
        'sv.id',
        'sv.code',
        'sv.laName',
        'sv.enName',
        'sv.createdAt',
        'sv.updatedAt',
        'svt.id',
        'svt.code',
        'svt.name',
      ];
      const result = await this.serviceRepository
        .createQueryBuilder('sv')
        .select(selectField)
        .leftJoin('sv.type', 'svt')
        .orderBy('sv.id', 'DESC')
        .getMany();
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Service> {
    try {
      const selectField = [
        'sv.id',
        'sv.code',
        'sv.laName',
        'sv.enName',
        'sv.createdAt',
        'sv.updatedAt',
        'svt.id',
        'svt.code',
        'svt.name',
      ];
      const result = await this.serviceRepository
        .createQueryBuilder('sv')
        .select(selectField)
        .leftJoin('sv.type', 'svt')
        .where({ id: id })
        .getOne();

      if (!result) {
        throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
      }

      return result;
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new HttpException('ເກີດຂໍ້ຜິດພາດ', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async update(id: number, updateServiceDto: UpdateServiceDto): Promise<Service> {
    try {
      const result = await this.serviceRepository.update(id, updateServiceDto);
      if (result.affected) {
        const newData = this.findOne(id);
        return newData;
      } else {
        throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
      }
    } catch (error) {
      if (error.errno == 1062) {
        throw new HttpException('ລະຫັດບໍ່ສາມາດຊ້ຳກັນໄດ້ ກະລຸນາລອງໃໝ່', HttpStatus.CONFLICT);
      }

      if (error.status) {
        throw new HttpException(error.message, error.status);
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      const result = await this.serviceRepository.delete(id);
      return result;
    } catch (error) {
      throw new HttpException('ເກີດຂໍ້ຜິດພາດ', HttpStatus.BAD_REQUEST);
    }
  }

  async removeSelected(selectedIds: any): Promise<DeleteResult> {
    try {
      const ids = selectedIds.split(',');
      const result = await this.serviceRepository
        .createQueryBuilder()
        .delete()
        .where('id In(:id)', { id: ids })
        .execute();

      if (result.affected) {
        return result;
      } else {
        throw new InternalServerErrorException('ບໍ່ພົບຂໍ້ມູນໃນລະບົບ');
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
