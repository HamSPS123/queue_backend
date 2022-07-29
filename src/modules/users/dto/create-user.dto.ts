/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class Role {
  id: number;
  name: string;
}

export class CreateUserDto {
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນລະຫັດພະນັກງານ' })
  code: string;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນຊື່ພະນັກງານ' })
  firstName: string;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນນາມສະກຸນພະນັກງານ' })
  lastName: string;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນສິດຜູ້ໃຊ້' })
  role: Role;
}

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນລະຫັດຜ່ານ' })
  password: string;
}


