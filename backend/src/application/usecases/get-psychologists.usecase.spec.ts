import { Test, TestingModule } from '@nestjs/testing';
import { GetPsychologistsUseCase } from './get-psychologists.usecase';
import { PsychologistRepository } from '../../domain/ports/psychologist.repository';
import { Psychologist } from '../../domain/entities/psychologist';

describe('GetPsychologistsUseCase', () => {
  let useCase: GetPsychologistsUseCase;
  const repo = {
    findAll: jest.fn<Promise<Psychologist[]>, [string?]>(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPsychologistsUseCase,
        { provide: 'PsychologistRepository', useValue: repo },
      ],
    }).compile();
    useCase = module.get(GetPsychologistsUseCase);
  });

  it('sin filtros devuelve todo', async () => {
    const sample = [new Psychologist('1','Ana', ['ansiedad'], [{ day:'Mon', hour:'10:00', mode:'online' }])];
    repo.findAll.mockResolvedValue(sample);
    await expect(useCase.execute({})).resolves.toEqual(sample);
  });

  it('filtra por topic y mode', async () => {
    const p1 = new Psychologist('1','Ana',['ansiedad'], [
      { day:'Mon', hour:'10:00', mode:'online' },
      { day:'Tue', hour:'11:00', mode:'presencial' },
    ]);
    repo.findAll.mockResolvedValue([p1]);
    const out = await useCase.execute({ topic:'ansiedad', mode:'online' });
    expect(out).toHaveLength(1);
    expect(out[0].availability.every(s=>s.mode==='online')).toBeTruthy();
  });
});
