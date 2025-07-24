import { Controller, Post, Body } from '@nestjs/common';
import { CreateSessionUseCase } from '../../../application/usecases/create-session.usecase';
import { CreateSessionDto } from '../../../application/dtos/create-session.dto';
import { Session } from '../../../domain/entities/session';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly createUseCase: CreateSessionUseCase) {}

  @Post()
  async create(@Body() dto: CreateSessionDto) {
    const domainSession = new Session(
      dto.psychologistId,
      dto.date,
      dto.patientTimezone,
      dto.timeSlot,
      dto.mode,
    );

    const created = await this.createUseCase.execute(domainSession);

    return {
      id:              created.id,
      psychologistId:  created.psychologistId,
      date:            created.date,
      patientTimezone: created.patientTimezone,
      timeSlot:        created.timeSlot,
      mode:            created.mode,
    };
  }
}
