import { Module } from '@nestjs/common';
import { ExamPeriodsController } from './exam-periods.controller';
import { ExamPeriodsService } from './exam-periods.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamPeriod } from './entities/exam-periods.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamPeriod, Schedule])],
  controllers: [ExamPeriodsController],
  providers: [ExamPeriodsService],
})
export class ExamPeriodsModule {}
