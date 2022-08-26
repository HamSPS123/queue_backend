import { BadRequestException, ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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
        const newData = await this.findOne(result.id);
        return newData;
      }
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException('ຊື່ເຄົາເຕີນີ້ມີແລ້ວ ກະລຸນາລອງໃໝ່');
      }
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Counter[]> {
    try {
      const selectField = [
        'cnt.id',
        'cnt.name',
        'cnt.avgWaitingTime',
        'cnt.status',
        'zn.id',
        'zn.code',
        'zn.name',
        'zn.typeId',
        'cnt.createdAt',
        'cnt.updatedAt',
      ];

      const counters = await this.countersRepository
        .createQueryBuilder('cnt')
        .select(selectField)
        .leftJoin('cnt.zone', 'zn')
        .orderBy('cnt.id', 'DESC')
        .getMany();

      return counters;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Counter> {
    try {
      const selectField = [
        'cnt.id',
        'cnt.name',
        'cnt.avgWaitingTime',
        'cnt.status',
        'zn.id',
        'zn.code',
        'zn.name',
        'zn.typeId',
        'cnt.createdAt',
        'cnt.updatedAt',
      ];

      const counters = await this.countersRepository
        .createQueryBuilder('cnt')
        .select(selectField)
        .leftJoin('cnt.zone', 'zn')
        .where('cnt.id=:id', { id: id })
        .getOne();

      if (!counters) {
        throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
      }

      return counters;
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.message, error.status);
      }
      throw new BadRequestException(error.message);
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

  async findFromZone(id: number): Promise<Counter[]> {
    try {
      const selectField = [
        'cnt.id',
        'cnt.name',
        'cnt.avgWaitingTime',
        'cnt.status',
        'zn.id',
        'zn.code',
        'zn.name',
        'zn.typeId',
        'cnt.createdAt',
        'cnt.updatedAt',
      ];
      const result = await this.countersRepository
        .createQueryBuilder('cnt')
        .select(selectField)
        .leftJoin('cnt.zone', 'zn')
        .where({ zoneId: id })
        .orderBy('cnt.id', 'ASC')
        .getMany();

      if (result) {
        return result;
      } else {
        throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
      }
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.message, error.status);
      }

      throw new BadRequestException(error.message);
    }
  }

  async updateStatus(id: number): Promise<Counter> {
    try {
      const update = await this.countersRepository
        .createQueryBuilder()
        .update()
        .set({
          status: false,
        })
        .where({ id: id })
        .execute();

      if (update.affected) {
        const result = this.findOne(id);
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
}
