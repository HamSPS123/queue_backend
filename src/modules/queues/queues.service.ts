import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UtilsService } from '../utils/utils.service';
import { CallQueueDto, CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { Queue } from './entities/queue.entity';

@Injectable()
export class QueuesService {
  constructor(
    @InjectRepository(Queue)
    private queuesRepository: Repository<Queue>,
    private utilsService: UtilsService,
  ) {}

  async create(data: CreateQueueDto): Promise<Queue> {
    try {
      const getQueue = await this.getCurrentQueue(data.serviceType.id);

      data.currentQueue = this.utilsService.prefix(getQueue + 1);
      data.nextQueue = this.utilsService.prefix(getQueue + 2);
      data.prevQueue = this.utilsService.prefix(getQueue);

      data.length = await (await this.getQueueLength()).toString();

      const result = await this.queuesRepository.save(data);

      if (result) {
        const find = await this.findOne(result.id);

        return find;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Queue[]> {
    try {
      const result = await this.queuesRepository.find({ relations: ['serviceType', 'service', 'counter', 'user'] });
      if (!result) throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
      return result;
    } catch (error) {
      if (error.status) throw new HttpException(error.message, error.status);
      throw new BadRequestException(error.message);
    }
  }

  async findTody(): Promise<Queue[]> {
    try {
      const selectFields = [
        'qu.id',
        'qu.currentQueue',
        'qu.length',
        'qu.nextQueue',
        'qu.prevQueue',
        'sv.code',
        'sv.laName',
        'sv.enName',
        'svt.code',
        'svt.name',
        'stt.id',
        'stt.name',
        'urs.id',
        'urs.username',
        'urs.firstName',
        'urs.lastName',
        'qu.createdAt',
      ];

      const whereOption = 'DATE(qu.created_at)=DATE(NOW())';

      const result = await this.queuesRepository
        .createQueryBuilder('qu')
        .select(selectFields)
        .leftJoin('qu.service', 'sv')
        .leftJoin('qu.serviceType', 'svt')
        .leftJoin('qu.status', 'stt')
        .leftJoin('qu.user', 'urs')
        .where(whereOption)
        .getMany();
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Queue> {
    try {
      const selectFields = [
        'qu.id',
        'qu.currentQueue',
        'qu.length',
        'qu.nextQueue',
        'qu.prevQueue',
        'sv.code',
        'sv.laName',
        'sv.enName',
        'svt.code',
        'svt.name',
        'stt.id',
        'stt.name',
        'urs.id',
        'urs.username',
        'urs.firstName',
        'urs.lastName',
        'qu.createdAt',
        'qu.updatedAt',
      ];
      // const options: FindOneOptions<Queue> = {
      //   where: { id: id },
      //   relations: ['counter', 'user', 'serviceType', 'service', 'status'],
      // };
      // const result = await this.queuesRepository.findOne(options);

      const result = await this.queuesRepository
        .createQueryBuilder('qu')
        .select(selectFields)
        .leftJoin('qu.serviceType', 'svt')
        .leftJoin('qu.service', 'sv')
        .leftJoin('qu.status', 'stt')
        .leftJoin('qu.user', 'urs')
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
        throw new BadRequestException('ເກີດຂໍ້ຜິດພາດ');
      }
    }
  }

  update(id: number, updateQueueDto: UpdateQueueDto) {
    return `This action updates a #${id} queue`;
  }

  remove(id: number) {
    return `This action removes a #${id} queue`;
  }

  async callQueue(id: number, data: CallQueueDto): Promise<Queue> {
    try {
      const query = await this.queuesRepository
        .createQueryBuilder('qu')
        .leftJoin('qu.serviceType', 'svt')
        .leftJoin('qu.service', 'sv')
        .leftJoin('qu.status', 'stt')
        .where('qu.status_id=1')
        .andWhere('DATE(qu.created_at)= DATE(NOW())')
        .andWhere('qu.service_type_id = :id', { id: id })
        .orderBy('qu.id', 'ASC')
        .getOne();

      if (query) {
        const queueId = query.id;

        const result = await this.queuesRepository
          .createQueryBuilder()
          .update()
          .set({
            counterId: data.counter.id,
            statusId: 2,
            userId: data.user.id,
          })
          .where('id=:id', { id: queueId })
          .execute();

        if (result.affected) {
          const find = this.findOne(queueId);
          return find;
        }
      }
      throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
    } catch (error) {
      if (error.errno === 1452) {
        throw new BadRequestException('ເກີດຂໍ້ຜິດພາດ');
      }
      if (error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new HttpException('ເກີດຂໍ້ຜິດພາດ', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async startQueue(id: number): Promise<Queue> {
    try {
      const datetime = new Date();
      const query = await this.queuesRepository
        .createQueryBuilder()
        .update()
        .set({
          startTime: datetime,
        })
        .where('id=:id', { id: id })
        .execute();

      if (query.affected) {
        const result = this.findOne(id);

        return result;
      }
      throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new HttpException('ເກີດຂໍ້ຜິດພາດ', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async endQueue(id: number): Promise<Queue> {
    try {
      const datetime = new Date();
      const query = await this.queuesRepository
        .createQueryBuilder()
        .update()
        .set({
          endTime: datetime,
          statusId: 3,
        })
        .where('id=:id', { id: id })
        .execute();

      if (query.affected) {
        const result = await this.findOne(id);
        return result;
      }
      throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new HttpException('ເກີດຂໍ້ຜິດພາດ', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async cancel(id: number): Promise<Queue> {
    try {
      const query = await this.queuesRepository
        .createQueryBuilder()
        .update()
        .set({
          statusId: 4,
        })
        .where('id=:id', { id: id })
        .execute();

      if (query.affected) {
        const result = await this.findOne(id);
        return result;
      }
      throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new HttpException('ເກີດຂໍ້ຜິດພາດ', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async display(): Promise<Queue[]> {
    try {
      const selectFields = [
        'qu.id',
        'qu.currentQueue',
        'qu.length',
        'qu.nextQueue',
        'qu.prevQueue',
        'sv.code',
        'sv.laName',
        'sv.enName',
        'svt.code',
        'svt.name',
        'stt.id',
        'stt.name',
        'qu.createdAt',
      ];

      const whereOption = 'status_id=1 AND DATE(qu.created_at)=DATE(NOW())';

      const result = await this.queuesRepository
        .createQueryBuilder('qu')
        .select(selectFields)
        .leftJoin('qu.service', 'sv')
        .leftJoin('qu.serviceType', 'svt')
        .leftJoin('qu.status', 'stt')
        .where(whereOption)
        .getMany();
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCurrentQueue(id: number): Promise<number> {
    try {
      const query = await this.queuesRepository
        .createQueryBuilder()
        .where('DATE(created_at)=DATE(NOW())')
        .andWhere('service_type_id=:id', { id: id })
        .getMany();

      if (query) {
        const result = query.length;
        return result;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getQueueLength(): Promise<number> {
    try {
      const query = await this.queuesRepository
        .createQueryBuilder()
        .where('DATE(created_at)=DATE(NOW())')
        .andWhere('status_id=1')
        .getMany();

      if (query) {
        const result = query.length;
        return result;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
