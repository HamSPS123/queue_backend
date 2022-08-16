import { PartialType } from '@nestjs/mapped-types';
import { CreateQueueStatusDto } from './create-queue-status.dto';

export class UpdateQueueStatusDto extends PartialType(CreateQueueStatusDto) {}
