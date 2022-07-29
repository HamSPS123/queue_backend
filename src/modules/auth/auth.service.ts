/* eslint-disable prettier/prettier */
import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(body: AuthDto) {
    try {
      const user = await this.usersRepository.findOne({
        select: ['id', 'password', 'roleId'],
        where: { code: body.code },
      });      

      if (!user) {
        throw new UnauthorizedException('ບໍ່ພົບຊື່ຜູ້ໃຊ້ນີ້');
      }

      const isValid = await argon2.verify(user.password, body.password);
      if (!isValid) {
        throw new UnauthorizedException('ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ');
      }

      const payload = {
        userId: user.id,
        roleId: user.roleId,
      };      

      const token = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET_KEY });      

      return {
        tokenType: 'Bearer',
        accessToken: token,
      };
    } catch (error) {
      if (error.status === 401) {
        throw new HttpException(error.message, error.status);
      }

      throw new BadRequestException(error);
    }
  }
}
