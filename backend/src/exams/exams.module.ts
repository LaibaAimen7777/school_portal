import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entities/exams.entity';
import { ExamsService } from './exams.service';
import { ExamsController } from './exams.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Exam])],
  providers: [ExamsService],
  controllers: [ExamsController],
})
export class ExamsModule {}
