import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PsychologistRepository } from '../../domain/ports/psychologist.repository';
import { AvailabilitySlot, Psychologist } from '../../domain/entities/psychologist';
import { PsychologistEntity } from './psychologist.entity';

@Injectable()
export class TypeOrmPsychologistRepository implements PsychologistRepository {
  constructor(
    @InjectRepository(PsychologistEntity)
    private readonly repo: Repository<PsychologistEntity>,
  ) {}

  async findAll(topic?: string): Promise<Psychologist[]> {
    let entities: PsychologistEntity[];

    if (topic) {
      entities = await this.repo.find({
        where: { topics: Like(`%${topic}%`) },
      });
    } else {
      entities = await this.repo.find();
    }


  return entities.map(e =>
    new Psychologist(
      e.id,
      e.name,
      e.topics,
      e.availability as AvailabilitySlot[],
    ),
  );

  }

  async findById(id: string): Promise<Psychologist> {
    const e = await this.repo.findOneBy({ id });
    if (!e) throw new Error(`Psychologist ${id} not found`);
    return new Psychologist(e.id, e.name, e.topics, e.availability);
  }


  async save(ps: Psychologist): Promise<Psychologist> {
    const ent = this.repo.create({
      id: ps.id,
      name: ps.name,
      topics: ps.topics,
      availability: ps.availability,
    });
    const saved = await this.repo.save(ent);
    return new Psychologist(saved.id, saved.name, saved.topics, saved.availability);
  }
}
