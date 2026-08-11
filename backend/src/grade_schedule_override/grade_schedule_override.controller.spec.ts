import { Test, TestingModule } from '@nestjs/testing';
import { GradeScheduleOverrideController } from './grade_schedule_override.controller';

describe('GradeScheduleOverrideController', () => {
  let controller: GradeScheduleOverrideController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GradeScheduleOverrideController],
    }).compile();

    controller = module.get<GradeScheduleOverrideController>(GradeScheduleOverrideController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
