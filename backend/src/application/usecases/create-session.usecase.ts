import { Inject, Injectable } from '@nestjs/common';
import { SessionRepository } from '../../domain/ports/session.repository';
import { Session } from '../../domain/entities/session';

@Injectable()
export class CreateSessionUseCase {
  constructor(
    @Inject('SessionRepository')
    private readonly repo: SessionRepository,
  ) {}

  execute(session: Session): Promise<Session> {
    return this.repo.create(session);
  }
}
