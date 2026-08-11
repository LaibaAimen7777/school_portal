import { Test, TestingModule } from '@nestjs/testing';
import { GradeScheduleOverrideService } from './grade_schedule_override.service';

describe('GradeScheduleOverrideService', () => {
  let service: GradeScheduleOverrideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradeScheduleOverrideService],
    }).compile();

    service = module.get<GradeScheduleOverrideService>(GradeScheduleOverrideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
