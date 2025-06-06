import { Test, TestingModule } from '@nestjs/testing';
import { RezervisaneKolicineService } from './rezervisane-kolicine.service';

describe('RezervisaneKolicineService', () => {
  let service: RezervisaneKolicineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RezervisaneKolicineService],
    }).compile();

    service = module.get<RezervisaneKolicineService>(RezervisaneKolicineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
