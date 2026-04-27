import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rooms } from './entities/rooms.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { Exam } from 'src/exams/entities/exams.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms, Schedule, Exam])],
  providers: [RoomsService],
  controllers: [RoomsController],
  exports: [RoomsService],
})
export class RoomsModule {}
