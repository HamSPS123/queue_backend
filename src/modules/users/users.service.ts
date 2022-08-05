/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, ResetPasswordDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private utilsService: UtilsService,
  ) {}

  async create(createDto: CreateUserDto) {
    try {
      const ramdomNumber: string = this.utilsService.RandomNumber(100000, 999999).toString();
      const hashPassword = await argon2.hash(ramdomNumber);
      const newObject = { ...createDto, defaultPassword: ramdomNumber, password: hashPassword };
      
      const result = await this.usersRepository.save(newObject);
      delete result.password;

      if (result) {
        return result;
      }
    } catch (error) {
      if (error.errno == 1062) {
        throw new HttpException('ລະຫັດບໍ່ສາມາດຊ້ຳກັນໄດ້ ກະລຸນາລອງໃໝ່', HttpStatus.CONFLICT);
      }
      console.log(error);

      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<User[]> {
    const options: FindManyOptions<User> = { select: {code: true,firstName: true, lastName: true,defaultPassword: true}, relations: ['role'], order: { id: 'DESC' } };
    const users = await this.usersRepository.find(options);

    return users;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  async update(id: number, data: UpdateUserDto): Promise<UpdateResult> {
    try {
      return await this.usersRepository.update(id, data);
    } catch (error) {
      if (error.errno == 1062) {
        throw new HttpException('ລະຫັດບໍ່ສາມາດຊ້ຳກັນໄດ້ ກະລຸນາລອງໃໝ່', HttpStatus.CONFLICT);
      }

      throw new BadRequestException(error);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }

  async resetPassword(id: number, data: ResetPasswordDto): Promise<UpdateResult> {
    try {      
      const user = new User();
      user.password = await argon2.hash(data.newPassword);
      user.defaultPassword = null;
      
      const result = await this.usersRepository.update(id, user);

      return result;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
