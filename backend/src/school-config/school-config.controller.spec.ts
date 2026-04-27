import { Test, TestingModule } from '@nestjs/testing';
import { SchoolConfigController } from './school-config.controller';

describe('SchoolConfigController', () => {
  let controller: SchoolConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolConfigController],
    }).compile();

    controller = module.get<SchoolConfigController>(SchoolConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
