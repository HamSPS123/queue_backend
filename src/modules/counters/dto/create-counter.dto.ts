import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCounterDto {
  @IsNotEmpty({ message: 'ກະລຸນາປ້ອນ Counter' })
  name: string;

  @IsOptional()
  avgWaitingTime: number;
}