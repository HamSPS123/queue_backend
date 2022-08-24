import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { CreateCounterDto } from './dto/create-counter.dto';
import { UpdateCounterDto } from './dto/update-counter.dto';
import { Counter } from './entities/counter.entity';

@Injectable()
export class CountersService {
  constructor(
    @InjectRepository(Counter)
    private countersRepository: Repository<Counter>,
  ) {}

  async create(createCounterDto: CreateCounterDto): Promise<Counter> {
    try {
      const result = await this.countersRepository.save(createCounterDto);

      if (result) {
        return result;
      }
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('ຊື່ເຄົາເຕີນີ້ມີແລ້ວ ກະລຸນາລອງໃໝ່');
      }
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Counter[]> {
    const result = await this.countersRepository.find({ relations: ['zone'], order: { id: 'DESC' } });
    return result;
  }

  async findOne(id: number): Promise<Counter> {
    try {
      const options: FindOneOptions<Counter> = { where: { id: id } };
      const Counter = await this.countersRepository.findOne(options);

      if (!Counter) {
        throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
      }

      return Counter;
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new HttpException('ເກີດຂໍ້ຜິດພາດ', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async update(id: number, updateCounterDto: UpdateCounterDto): Promise<Counter> {
    try {
      const result = await this.countersRepository.update(id, updateCounterDto);
      if (result.affected) {
        const newData = await this.findOne(id);
        return newData;
      } else {
        throw new BadRequestException('ບໍ່ພົບຂໍ້ມູນ');
      }
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('ຊື່ເຄົາເຕີນີ້ມີແລ້ວ ກະລຸນາລອງໃໝ່');
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    try {
      const result = await this.countersRepository.delete(id);
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeSelected(selectedIds: any): Promise<DeleteResult> {
    try {
      const ids = selectedIds.split(',');
      const result = await this.countersRepository
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
