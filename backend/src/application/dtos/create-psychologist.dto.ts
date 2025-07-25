import { IsString, IsArray, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AvailabilityItem {
  @IsString() day!: string;
  @IsString() hour!: string;
}

export class CreatePsychologistDto {
  @IsString() name!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  topics!: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabilityItem)
  availability!: AvailabilityItem[];
}