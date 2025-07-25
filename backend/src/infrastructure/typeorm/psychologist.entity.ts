import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('psychologists')
export class PsychologistEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column() name!: string;
  @Column('simple-array')   topics!: string[];
  @Column('simple-json')    availability!: Array<{
    day: string;
    hour: string;
    mode: 'online' | 'presencial';
  }>;
}
