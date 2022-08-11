import { IsNotEmpty } from 'class-validator';

export class ServiceType {
  id: number;
  name: string;
}

export class CreateServiceDto {
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນລະຫັດບໍລີການ' })
  code: string;
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນຊື່ບໍລີການ' })
  name: string;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນສິດຜູ້ໃຊ້' })
  serviceType: ServiceType;
}
