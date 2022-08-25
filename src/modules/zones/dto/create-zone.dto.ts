import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';

export class CommonModel {
  @IsNotEmpty()
  id: number;
}
export class CreateZoneDto {
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນລະຫັດ' })
  code: string;

  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນຊື່ໂຊນ' })
  name: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CommonModel)
  serviceType: CommonModel;
}
