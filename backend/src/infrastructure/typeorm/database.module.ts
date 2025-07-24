import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PsychologistEntity } from "./psychologist.entity";
import { SessionEntity } from "./session.entity";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [PsychologistEntity, SessionEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}