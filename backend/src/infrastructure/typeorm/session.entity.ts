import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sessions')
export class SessionEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  psychologistId!: string;

  @Column()
  date!: string;

  @Column()
  patientTimezone!: string;

  @Column()
  timeSlot!: string;

  @Column()
  mode!: string;
  
}
