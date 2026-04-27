import { Module } from '@nestjs/common';
import { SchoolConfigController } from './school-config.controller';
import { SchoolConfigService } from './school-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolConfig } from './entities/school-config.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolConfig, Schedule])],
  controllers: [SchoolConfigController],
  providers: [SchoolConfigService],
})
export class SchoolConfigModule {}
