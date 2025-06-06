import { PartialType } from '@nestjs/mapped-types';
import { CreateGodisnjiPlanDto } from './create-godisnji-plan.dto';

export class UpdateGodisnjiPlanDto extends PartialType(CreateGodisnjiPlanDto) {}
