import { IsNotEmpty } from 'class-validator';

export class CreateZoneDto {
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນລະຫັດ' })
  code: string;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນຊື່ໂຊນ' })
  name: string;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນປະເພດບໍລິການ' })
  typeId: number;
}
