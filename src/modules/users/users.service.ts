/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, FindOneOptions, In, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, ResetPasswordDto, Role } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as argon2 from 'argon2';
import { UtilsService } from '../utils/utils.service';
import { from } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private utilsService: UtilsService,
  ) {}

  async create(createDto: CreateUserDto): Promise<User> {
    try {
      const ramdomNumber: string = this.utilsService.RandomNumber(100000, 999999).toString();
      const hashPassword = await argon2.hash(ramdomNumber);
      const newObject = { ...createDto, defaultPassword: ramdomNumber, password: hashPassword };
      
      const result = await this.usersRepository.save(newObject);
      // if (result) {
      //   return result;
      // }

      if(result){
        const newData = await this.findOne(result.id);

        return newData;
      }else{
        throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນຜູ້ໃຊ້ນີ້');
      }
    } catch (error) {
      if (error.errno == 1062) {
        throw new HttpException('ລະຫັດບໍ່ສາມາດຊ້ຳກັນໄດ້ ກະລຸນາລອງໃໝ່', HttpStatus.CONFLICT);
      }
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<User[]> {
    const options: FindManyOptions<User> = { relations: ['role'], order: { id: 'DESC' } };
    const users = await this.usersRepository.find(options);

    return users;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    try {
      const result = await this.usersRepository.update(id, data);

      if(result.affected){
        const newData = await this.findOne(id);
        return newData;
      }else{
        throw new NotFoundException("ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນໄດ້");
      }
    } catch (error) {
      if (error.errno == 1062) {
        throw new HttpException('ລະຫັດບໍ່ສາມາດຊ້ຳກັນໄດ້ ກະລຸນາລອງໃໝ່', HttpStatus.CONFLICT);
      }

      throw new BadRequestException(error);
    }
  }

  async remove(id: number): Promise<DeleteResult> {
    const result = await this.usersRepository.delete(id);
    return result;
  }

  async resetPassword(id: number, data: ResetPasswordDto): Promise<User> {
    try {      
      const user = new User();
      user.password = await argon2.hash(data.newPassword);
      user.defaultPassword = null;
      
      const result = await this.usersRepository.update(id, user);

      if(result.affected){
        const newData = this.findOne(id);
        return newData;
      }else{
        throw new NotFoundException('ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນໄດ້');
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async defaultPassword(id: number): Promise<User> {
    try { 
      const user = new User();
      const ramdomNumber: string = this.utilsService.RandomNumber(100000, 999999).toString();
      const hashPassword: string = await argon2.hash(ramdomNumber);

      user.password = hashPassword;
      user.defaultPassword = ramdomNumber;
      
      const result = await this.usersRepository.update(id, user);

      if(result.affected){
        const newData = this.findOne(id);
        return newData;
      }else{
        throw new NotFoundException('ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນໄດ້');
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const options: FindOneOptions<User> = { where: { id: id }, relations: ['role'] };
      const level = await this.usersRepository.findOne(options);

      if (!level) {
        throw new NotFoundException('ບໍ່ພົບຂໍ້ມູນ');
      }

      return level;
    } catch (error) {
      if (error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new HttpException('ເກີດຂໍ້ຜິດພາດ', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async removeSelected(selectedIds: any){
    try {
      const ids = selectedIds.split(",");      
      const result = await this.usersRepository.createQueryBuilder()
      .delete()
      .where("id In(:id)", { id: ids })
      .execute();

    if(result)
    return result;

    throw new BadRequestException("ເກີດຂໍ້ຜິດພາດ")
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
