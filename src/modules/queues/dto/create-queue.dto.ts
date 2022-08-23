import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateQueueDto {
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນປະເພດບໍລິການ' })
  serviceTypeId: number;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນບໍລິການ' })
  serviceId: number;

  @IsOptional()
  currentQueue: string;

  @IsOptional()
  nextQueue: string;

  @IsOptional()
  prevQueue: string;

  @IsOptional()
  length: string;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນສະຖານະ' })
  statusId: number;
}

export class CallQueueDto {
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນໝາຍເລກເຄົາເຕີ' })
  counterId: number;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນຂໍ້ມູນຜູ້ໃຊ້' })
  userId: number;
}
