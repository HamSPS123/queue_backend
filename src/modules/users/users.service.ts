/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, ResetPasswordDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {    
    try {
      const user = new User();
      user.code = data.code;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.roleId = data.role?.id;
      

      const result = await this.usersRepository.save(user);
      // delete result.password;      

      return result;
    } catch (error) {
      if (error.errno == 1062) {
        throw new HttpException('ລະຫັດບໍ່ສາມາດຊ້ຳກັນໄດ້ ກະລຸນາລອງໃໝ່', HttpStatus.CONFLICT);
      }      
      console.log(error);
      

      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['role'],
      order: { id: 'DESC' },
    });
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

  async resetPassword(id: number, data: ResetPasswordDto): Promise<UpdateResult>{
    // try {
    //   const user = new User();
    //   user.password = await argon2.hash(data.password);

    //   const result = await this.usersRepository.update(id, user);

    //   console.log(result);
      
    //   return result;
    // } catch (error) {
    //   throw new BadRequestException(error);
    // }

    console.log(data);
    return;
    
  }
}
