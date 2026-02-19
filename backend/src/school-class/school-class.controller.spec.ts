import { Test, TestingModule } from '@nestjs/testing';
import { SchoolClassController } from './school-class.controller';

describe('SchoolClassController', () => {
  let controller: SchoolClassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolClassController],
    }).compile();

    controller = module.get<SchoolClassController>(SchoolClassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
