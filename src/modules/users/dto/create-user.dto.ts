/* eslint-disable prettier/prettier */
import { Optional } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

export class Role {
  id: number;
  name: string;
}

export class CreateUserDto {
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນລະຫັດພະນັກງານ' })
  username: string;

  @Optional()
  password: string;

  @Optional()
  defaultPassword: string;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນຊື່ພະນັກງານ' })
  firstName: string;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນນາມສະກຸນພະນັກງານ' })
  lastName: string;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນສິດຜູ້ໃຊ້' })
  role: Role;
}

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນລະຫັດຜ່ານ' })
  newPassword: string;
}


