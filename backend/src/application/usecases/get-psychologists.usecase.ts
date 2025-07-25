import { Inject, Injectable } from '@nestjs/common';
import { PsychologistRepository } from '../../domain/ports/psychologist.repository';
import { Psychologist } from '../../domain/entities/psychologist';

@Injectable()
export class GetPsychologistsUseCase {
  constructor(
    @Inject('PsychologistRepository')
    private repo: PsychologistRepository,
  ) {}

  async execute(filters: { topic?: string; mode?: string }) {
    const all = await this.repo.findAll(filters.topic);
    if (filters.mode) {
      return all
        .map(p => ({
          ...p,
          availability: p.availability.filter(s => s.mode === filters.mode),
        }))
        .filter(p => p.availability.length > 0);
    }

    return all;
  }
}

