import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PsychologistEntity } from '../../infrastructure/typeorm/psychologist.entity';
import { SessionEntity } from '../../infrastructure/typeorm/session.entity';

import { PsychologistsController } from './controllers/psychologists.controller';
import { SessionsController } from './controllers/sessions.controller';

import { GetPsychologistsUseCase } from '../../application/usecases/get-psychologists.usecase';
import { CreateSessionUseCase } from '../../application/usecases/create-session.usecase';

import { TypeOrmPsychologistRepository } from '../../infrastructure/typeorm/psychologist.repository';
import { TypeOrmSessionRepository } from '../../infrastructure/typeorm/session.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PsychologistEntity, SessionEntity]),
  ],
  controllers: [
    PsychologistsController,
    SessionsController,
  ],
  providers: [
    GetPsychologistsUseCase,
    CreateSessionUseCase,
    { provide: 'PsychologistRepository', useClass: TypeOrmPsychologistRepository },
    { provide: 'SessionRepository',      useClass: TypeOrmSessionRepository },
  ],
})
export class HttpModule {}
