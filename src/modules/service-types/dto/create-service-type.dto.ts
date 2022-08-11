import { IsNotEmpty } from 'class-validator';

export class CreateServiceTypeDto {
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນລະຫັດປະເພດບໍລິການ' })
  code: string;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນຊື່ປະເພດບໍລິການ' })
  name: string;
}
