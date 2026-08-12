import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolConfig } from './entities/school-config.entity';
import { Repository } from 'typeorm';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { UpdateSchoolConfigDto } from './dto/update-school-config.dto';

// school-config/school-config.service.ts
@Injectable()
export class SchoolConfigService {
  constructor(
    @InjectRepository(SchoolConfig)
    private configRepo: Repository<SchoolConfig>,
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
  ) {}

  async getConfig(): Promise<SchoolConfig> {
    let config = await this.configRepo.findOne({ where: { id: 1 } });

    if (!config) {
      config = await this.configRepo.save(
        this.configRepo.create({
          schoolStartTime: '08:00',
          schoolEndTime: '15:00',
          periodDurationMinutes: 40,
          breakDurationMinutes: 5,
        }),
      );
    }

    return config;
  }

  async updateTiming(dto: UpdateSchoolConfigDto) {
    const config = await this.getConfig();
    const updated = await this.configRepo.save({ ...config, ...dto });

    console.log('config before', config);
    console.log('Update times', updated);

    // Run audit and return conflicts alongside the updated config
    const conflicts = await this.auditSchedulesAgainstNewTiming(updated);
    return { config: updated, conflicts };
  }

  // Returns all schedule entries that fall outside the new school hours
  async auditSchedulesAgainstNewTiming(config: SchoolConfig) {
    const allSchedules = await this.scheduleRepo.find({
      relations: ['schoolClass', 'subject', 'teacher'],
    });

    return allSchedules
      .filter((s) => {
        return (
          s.startTime < config.schoolStartTime ||
          s.endTime > config.schoolEndTime
        );
      })
      .map((s) => ({
        id: s.id,
        class: `${s.schoolClass.grade}-${s.schoolClass.section}`,
        subject: s.subject.name,
        teacher: s.teacher.fullName,
        day: s.dayOfWeek,
        slot: `${s.startTime} – ${s.endTime}`,
        issue:
          s.startTime < config.schoolStartTime
            ? `Starts before new school start (${config.schoolStartTime})`
            : `Ends after new school end (${config.schoolEndTime})`,
      }));
  }
}
