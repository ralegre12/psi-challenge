import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository }                  from '@nestjs/typeorm';
import { Repository }                        from 'typeorm';
import { PsychologistEntity }                from './psychologist.entity';
import { SessionEntity }                     from './session.entity';

@Injectable()
export class DatabaseSeeder implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(PsychologistEntity)
    private psyRepo: Repository<PsychologistEntity>,
    @InjectRepository(SessionEntity)
    private sesRepo: Repository<SessionEntity>,
  ) {}

  async onApplicationBootstrap() {
    const pys = this.psyRepo.create([
      {
        name: 'Luis López',
        topics: ['ansiedad'],
        availability: [
          { day: 'Friday', hour: '09:00', mode: 'online' },
        ],
      },
      {
        name: 'Sofía Martínez',
        topics: ['depresión', 'estrés'],
        availability: [
          { day: 'Monday', hour: '11:00', mode: 'presencial' },
          { day: 'Wednesday', hour: '15:00', mode: 'online' },
        ],
      },
      {
        name: 'María Pérez',
        topics: ['ansiedad', 'depresión'],
        availability: [
          { day: 'Monday', hour: '10:00', mode: 'online' },
          { day: 'Wednesday', hour: '14:00', mode: 'presencial' },
          { day: 'Thursday', hour: '13:00', mode: 'online' },
        ],
      },
      {
        name: 'Ana Gómez',
        topics: ['parejas', 'autoestima', 'fobias'],
        availability: [
          { day: 'Tuesday', hour: '09:00', mode: 'online' },
          { day: 'Tuesday', hour: '11:00', mode: 'presencial' },
          { day: 'Thursday', hour: '16:00', mode: 'online' },
          { day: 'Friday', hour: '10:00', mode: 'presencial' },
          { day: 'Friday', hour: '14:00', mode: 'online' },
        ],
      },
      {
        name: 'Carlos Ramírez',
        topics: ['autoestima', 'estrés'],
        availability: [
          { day: 'Monday', hour: '09:00', mode: 'online' },
          { day: 'Monday', hour: '12:00', mode: 'presencial' },
          { day: 'Wednesday', hour: '10:00', mode: 'online' },
          { day: 'Wednesday', hour: '16:00', mode: 'presencial' },
          { day: 'Thursday', hour: '11:00', mode: 'online' },
          { day: 'Friday', hour: '15:00', mode: 'presencial' },
        ],
      },
    ]);
    await this.psyRepo.save(pys);

    console.log('✅ Database seeded in memory');
  }
}
