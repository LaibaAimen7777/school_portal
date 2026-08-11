import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateGradeOverrideDto,
  UpdateGradeOverrideDto,
} from './dto/gradeOverride.dto';
import { GradeScheduleOverride } from './entities/gradeSchedule.entity';
import { SchoolConfig } from 'src/school-config/entities/school-config.entity';

@Injectable()
export class GradeOverrideService {
  constructor(
    @InjectRepository(GradeScheduleOverride)
    private readonly overrideRepo: Repository<GradeScheduleOverride>,

    @InjectRepository(SchoolConfig)
    private readonly configRepo: Repository<SchoolConfig>,
  ) {}

  // ─── helpers ────────────────────────────────────────────────────────────────

  /** Returns the one and only SchoolConfig row, or throws. */
  private async getConfig(): Promise<SchoolConfig> {
    const config = await this.configRepo.findOne({ where: {} });
    if (!config) throw new NotFoundException('School config not found');
    return config;
  }

  /**
   * Validate that an override's end time is not after or equal to the
   * school's start time, and not before the school's start time.
   */
  private validateAgainstConfig(
    endTime: string | null | undefined,
    fridayEndTime: string | null | undefined,
    config: SchoolConfig,
  ) {
    const toMins = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };

    const startMins = toMins(config.schoolStartTime);

    if (endTime) {
      const endMins = toMins(endTime);
      if (endMins <= startMins) {
        throw new BadRequestException(
          `endTime (${endTime}) must be after school start time (${config.schoolStartTime})`,
        );
      }
    }

    if (fridayEndTime) {
      const friMins = toMins(fridayEndTime);
      if (friMins <= startMins) {
        throw new BadRequestException(
          `fridayEndTime (${fridayEndTime}) must be after school start time (${config.schoolStartTime})`,
        );
      }
    }
  }

  // ─── public methods ──────────────────────────────────────────────────────────

  async findAll(): Promise<GradeScheduleOverride[]> {
    const config = await this.getConfig();
    return this.overrideRepo.find({
      where: { schoolConfig: { id: config.id } },
      order: { grade: 'ASC' },
    });
  }

  async findByGrade(grade: number): Promise<GradeScheduleOverride> {
    const config = await this.getConfig();
    const override = await this.overrideRepo.findOne({
      where: { grade, schoolConfig: { id: config.id } },
    });
    if (!override) {
      throw new NotFoundException(`No override found for Grade ${grade}`);
    }
    return override;
  }

  async create(dto: CreateGradeOverrideDto): Promise<GradeScheduleOverride> {
    if (!dto.endTime && !dto.fridayEndTime) {
      throw new BadRequestException(
        'Provide at least one of endTime or fridayEndTime',
      );
    }

    const config = await this.getConfig();

    // Duplicate check
    const existing = await this.overrideRepo.findOne({
      where: { grade: dto.grade, schoolConfig: { id: config.id } },
    });
    if (existing) {
      throw new ConflictException(
        `Grade ${dto.grade} already has an override — use PATCH to update it`,
      );
    }

    this.validateAgainstConfig(dto.endTime, dto.fridayEndTime, config);

    const override = this.overrideRepo.create({
      grade: dto.grade,
      endTime: dto.endTime ?? null,
      fridayEndTime: dto.fridayEndTime ?? null,
      schoolConfig: config,
    });

    return this.overrideRepo.save(override);
  }

  async update(
    grade: number,
    dto: UpdateGradeOverrideDto,
  ): Promise<GradeScheduleOverride> {
    const override = await this.findByGrade(grade); // throws 404 if missing
    const config = await this.getConfig();

    // Merge in the new values before validating
    const nextEndTime =
      dto.endTime !== undefined ? dto.endTime : override.endTime;
    const nextFridayEndTime =
      dto.fridayEndTime !== undefined
        ? dto.fridayEndTime
        : override.fridayEndTime;

    if (!nextEndTime && !nextFridayEndTime) {
      throw new BadRequestException(
        'At least one of endTime or fridayEndTime must remain set',
      );
    }

    this.validateAgainstConfig(nextEndTime, nextFridayEndTime, config);

    Object.assign(override, {
      endTime: nextEndTime,
      fridayEndTime: nextFridayEndTime,
    });

    return this.overrideRepo.save(override);
  }

  async remove(grade: number): Promise<{ message: string }> {
    const override = await this.findByGrade(grade); // throws 404 if missing
    await this.overrideRepo.remove(override);
    return { message: `Grade ${grade} override removed` };
  }
}
