import { BadRequestException, Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions, DeleteResult } from 'typeorm';
import { CreateServiceTypeDto } from './dto/create-service-type.dto';
import { UpdateServiceTypeDto } from './dto/update-service-type.dto';
import { ServiceType } from './entities/service-type.entity';

@Injectable()
export class ServiceTypesService {
  constructor(
    @InjectRepository(ServiceType)
    private serviceTypesRepository: Repository<ServiceType>,
  ) {}

  async create(createServiceTypeDto: CreateServiceTypeDto) {
    try {
      const result = await this.serviceTypesRepository.save(createServiceTypeDto);
      return result;
    } catch (error) {
      if (error.errno == 1062) {
        throw new HttpException('ລະຫັດບໍ່ສາມາດຊ້ຳກັນໄດ້ ກະລຸນາລອງໃໝ່', HttpStatus.CONFLICT);
      }
      throw new BadRequestException(error); // error 400
    }
  }

  async findAll(): Promise<ServiceType[]> {
    const result = await this.serviceTypesRepository.find();
    return result;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} serviceType`;
  // }

  async update(id: number, updateServiceTypeDto: UpdateServiceTypeDto): Promise<ServiceType> {
    try {
      const result = await this.serviceTypesRepository.update(id, updateServiceTypeDto);
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
      throw new BadRequestException(error); // error 400
    }
  }

  async findOne(id: number): Promise<ServiceType> {
    try {
      const options: FindOneOptions<ServiceType> = { where: { id: id } };
      const serviceType = await this.serviceTypesRepository.findOne(options);

      if (!serviceType) {
        throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
      }

      return serviceType;
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new HttpException('ເກີດຂໍ້ຜິດພາດ', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      const result = await this.serviceTypesRepository.delete(id);
      return result;
    } catch (error) {
      throw new HttpException('ເກີດຂໍ້ຜິດພາດ', HttpStatus.BAD_REQUEST);
    }
  }

  async removeSelected(selectedIds: any): Promise<DeleteResult> {
    try {
      const ids = selectedIds.split(',');
      const result = await this.serviceTypesRepository
        .createQueryBuilder()
        .delete()
        .where('id In(:id)', { id: ids })
        .execute();

      if (result.affected) {
        return result;
      } else {
        throw new BadRequestException('ບໍ່ພົບຂໍ້ມູນໃນລະບົບ');
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
