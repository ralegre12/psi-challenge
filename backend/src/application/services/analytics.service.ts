import { Inject, Injectable } from '@nestjs/common';
import { SessionRepository }      from '../../domain/ports/session.repository';
import { PsychologistRepository } from '../../domain/ports/psychologist.repository';

@Injectable()
export class AnalyticsService {
  constructor(
    @Inject('SessionRepository')
    private readonly sessions: SessionRepository,
    @Inject('PsychologistRepository')
    private readonly psychs: PsychologistRepository,
  ) {}

  async execute() {
    const all = await this.sessions.findAll();

    //info: conteo por modalidad
    const modeCounts: Record<string, number> = {};
    all.forEach(s => {
      modeCounts[s.mode] = (modeCounts[s.mode] || 0) + 1;
    });
    const [mode, modeCount] = Object.entries(modeCounts)
      .sort((a, b) => b[1] - a[1])[0] ?? [null, 0];

    //info: conteo por día
    const dayCounts: Record<string, number> = {};
    all.forEach(s => {
      const day = s.timeSlot.split(' ')[0];
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    const [day, dayCount] = Object.entries(dayCounts)
      .sort((a, b) => b[1] - a[1])[0] ?? [null, 0];

    //info: conteo por temática
    const topicCounts: Record<string, number> = {};
    for (const s of all) {
      let p;
      try {
        p = await this.psychs.findById(s.psychologistId);
      } catch {
        continue;
      }
      p.topics.forEach(t => {
        topicCounts[t] = (topicCounts[t] || 0) + 1;
      });
    }
    const [topic, topicCount] = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])[0] ?? [null, 0];

    return {
      topMode:   mode   ? { mode,   count: modeCount   } : null,
      topDay:    day    ? { day,    count: dayCount    } : null,
      topTopic:  topic  ? { topic,  count: topicCount  } : null,
    };
  }
}
