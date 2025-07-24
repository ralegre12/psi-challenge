import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist:true }));
    await app.init();
  });

  it('/psychologists GET sin filtros', () =>
    request(app.getHttpServer())
      .get('/psychologists')
      .expect(200)
      .expect(res => Array.isArray(res.body) && res.body.length > 0)
  );

  it('/psychologists?topic=ansiedad filtra', () =>
    request(app.getHttpServer())
      .get('/psychologists?topic=ansiedad')
      .expect(200)
      .expect(res => res.body.every(p => p.topics.includes('ansiedad')))
  );

  it('/sessions POST crea sesión', () => {
    return request(app.getHttpServer())
      .post('/sessions')
      .send({
        psychologistId: 'a3e996c1-3b73-4678-b1cc-81e329422105',
        date: new Date().toISOString(),
        patientTimezone: 'America/Buenos_Aires',
        timeSlot: 'Monday 10:00',
        mode: 'online'
      })
      .expect(201)
      .expect(res => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.mode).toBe('online');
      });
  });

  it('/analytics GET devuelve métricas', () =>
    request(app.getHttpServer())
      .get('/analytics')
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('topTopic');
        expect(res.body).toHaveProperty('topDay');
        expect(res.body).toHaveProperty('topMode');
      })
  );

  afterAll(() => app.close());
});
