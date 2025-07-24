import { Test, TestingModule } from '@nestjs/testing';
import { CreateSessionUseCase } from './create-session.usecase';
import { SessionRepository } from '../../domain/ports/session.repository';
import { Session } from '../../domain/entities/session';

describe('CreateSessionUseCase', () => {
  let useCase: CreateSessionUseCase;
  const repo = { create: jest.fn<Promise<Session>, [Session]>() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSessionUseCase,
        { provide: 'SessionRepository', useValue: repo },
      ],
    }).compile();
    useCase = module.get(CreateSessionUseCase);
  });

  it('delegar creación al repo', async () => {
    const s = new Session('','1', new Date().toISOString(), 'TZ','Mon 10:00','online');
    repo.create.mockResolvedValue(s);
    await expect(useCase.execute(s)).resolves.toBe(s);
    expect(repo.create).toHaveBeenCalledWith(s);
  });
});
