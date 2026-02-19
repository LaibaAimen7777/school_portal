import { Test, TestingModule } from '@nestjs/testing';
import { SchoolClassService } from './school-class.service';

describe('SchoolClassService', () => {
  let service: SchoolClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolClassService],
    }).compile();

    service = module.get<SchoolClassService>(SchoolClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
