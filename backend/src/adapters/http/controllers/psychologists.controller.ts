import { Controller, Get, Query } from '@nestjs/common';
import { GetPsychologistsUseCase } from '../../../application/usecases/get-psychologists.usecase';

@Controller('psychologists')
export class PsychologistsController {
  constructor(private readonly getUseCase: GetPsychologistsUseCase) {}

@Get()
async findAll(
  @Query('topic') topic?: string,
  @Query('mode')  mode?: 'online' | 'presencial',
) {
  return this.getUseCase.execute({ topic, mode });
}

}