import { Session } from '../entities/session';
export interface SessionRepository {
  create(session: Session): Promise<Session>;
  findAll(): Promise<Session[]>;
}