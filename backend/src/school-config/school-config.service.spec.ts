import { Test, TestingModule } from '@nestjs/testing';
import { SchoolConfigService } from './school-config.service';

describe('SchoolConfigService', () => {
  let service: SchoolConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolConfigService],
    }).compile();

    service = module.get<SchoolConfigService>(SchoolConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
