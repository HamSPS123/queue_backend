import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from 'class-validator';

export class CommonModel {
  @IsNotEmpty()
  id: number;
}
export class CreateCounterDto {
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນ Counter' })
  name: string;

  @IsOptional()
  avgWaitingTime: number;

  @IsNotEmptyObject()
  @IsObject({ message: 'ຂໍ້ມູນຕ້ອງເປັນ Object' })
  @ValidateNested()
  @Type(() => CommonModel)
  zone: CommonModel;
}
