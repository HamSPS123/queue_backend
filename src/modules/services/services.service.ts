import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository } from 'typeorm';
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
      const result = await this.serviceRepository.find({ relations: ['type'], order: { id: 'DESC' } });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Service> {
    try {
      const options: FindOneOptions<Service> = { where: { id: id }, relations: ['type'] };
      const Service = await this.serviceRepository.findOne(options);

      if (!Service) {
        throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
      }

      return Service;
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
        throw new NotFoundException('ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນໄດ້');
      }
    } catch (error) {
      if (error.errno == 1062) {
        throw new HttpException('ລະຫັດບໍ່ສາມາດຊ້ຳກັນໄດ້ ກະລຸນາລອງໃໝ່', HttpStatus.CONFLICT);
      }
      throw new InternalServerErrorException(error); // error 400
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
