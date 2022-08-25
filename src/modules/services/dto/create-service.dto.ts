import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';

export class CommonModel {
  @IsNotEmpty()
  id: number;
}
export class CreateServiceDto {
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນລະຫັດບໍລີການ' })
  code: string;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນຊື່ບໍລີການ' })
  laName: string;

  @Optional()
  enName: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CommonModel)
  type: CommonModel;
}
