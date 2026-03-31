import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';
import { MarksController } from './marks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mark } from './entities/marks.entity';
import { Exam } from 'src/exams/entities/exams.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mark, Exam])],
  providers: [MarksService],
  controllers: [MarksController],
})
export class MarksModule {}
