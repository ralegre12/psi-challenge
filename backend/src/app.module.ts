import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from './infrastructure/typeorm/database.module';
import { PsychologistEntity } from './infrastructure/typeorm/psychologist.entity';
import { SessionEntity }     from './infrastructure/typeorm/session.entity';

import { TypeOrmPsychologistRepository } from './infrastructure/typeorm/psychologist.repository';
import { TypeOrmSessionRepository       } from './infrastructure/typeorm/session.repository';

import { GetPsychologistsUseCase }  from './application/usecases/get-psychologists.usecase';
import { CreateSessionUseCase   }  from './application/usecases/create-session.usecase';

import { PsychologistsController } from './adapters/http/controllers/psychologists.controller';
import { SessionsController      } from './adapters/http/controllers/sessions.controller';

import { DatabaseSeeder } from './infrastructure/typeorm/database.seed';
import { AnalyticsService } from './application/services/analytics.service';
import { AnalyticsController } from './adapters/http/controllers/analytics.controller';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([PsychologistEntity, SessionEntity]),
  ],
  controllers: [
    PsychologistsController,
    SessionsController,
    AnalyticsController,
  ],
  providers: [
    AnalyticsService,
    GetPsychologistsUseCase,
    CreateSessionUseCase,
    { provide: 'PsychologistRepository', useClass: TypeOrmPsychologistRepository },
    { provide: 'SessionRepository',      useClass: TypeOrmSessionRepository },
    DatabaseSeeder,
  ],
})
export class AppModule {}
