import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionRepository } from '../../domain/ports/session.repository';
import { Session } from '../../domain/entities/session';
import { SessionEntity } from './session.entity';

@Injectable()
export class TypeOrmSessionRepository implements SessionRepository {
  constructor(
    @InjectRepository(SessionEntity)
    private readonly repo: Repository<SessionEntity>,
  ) {}

  async create(session: Session): Promise<Session> {
    const ent = this.repo.create({
      psychologistId: session.psychologistId,
      date:           session.date,
      patientTimezone:session.patientTimezone,
      timeSlot:       session.timeSlot,
      mode:           session.mode,
    });
    const saved = await this.repo.save(ent);

    return new Session(
      saved.psychologistId,
      saved.date,
      saved.patientTimezone,
      saved.timeSlot,
      saved.mode,
      saved.id,
    );
  }

  async findAll(): Promise<Session[]> {
    const entities = await this.repo.find();
    return entities.map(e =>
      new Session(
        e.psychologistId,
        e.date,
        e.patientTimezone,
        e.timeSlot,
        e.mode,
        e.id,
      ),
    );
  }
}
