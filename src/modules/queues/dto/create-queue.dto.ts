import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from 'class-validator';

export class CommonModel {
  @IsNotEmpty()
  id: number;
}
export class CreateQueueDto {
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CommonModel)
  serviceType: CommonModel;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CommonModel)
  service: CommonModel;

  @IsOptional()
  currentQueue: string;

  @IsOptional()
  nextQueue: string;

  @IsOptional()
  prevQueue: string;

  @IsOptional()
  length: string;
}

export class CallQueueDto {
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CommonModel)
  counter: CommonModel;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CommonModel)
  user: CommonModel;
}
