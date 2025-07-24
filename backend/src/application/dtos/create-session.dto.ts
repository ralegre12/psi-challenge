import { IsUUID, IsISO8601, IsString } from 'class-validator';

export class CreateSessionDto {
  @IsUUID()
  psychologistId: string;

  @IsISO8601()
  date: string;

  @IsString()
  patientTimezone: string;

  @IsString()
  timeSlot: string;

  @IsString()
  mode: string;
}
