import { Psychologist } from '../entities/psychologist';
export interface PsychologistRepository {
  findAll(topic?: string): Promise<Psychologist[]>;
  save(psychologist: Psychologist): Promise<Psychologist>;
  findById(id: string): Promise<Psychologist>;
}