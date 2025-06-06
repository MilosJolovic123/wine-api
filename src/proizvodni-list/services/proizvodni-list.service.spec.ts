import { Test, TestingModule } from '@nestjs/testing';
import { ProizvodniListService } from './proizvodni-list.service';

describe('ProizvodniListService', () => {
  let service: ProizvodniListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProizvodniListService],
    }).compile();

    service = module.get<ProizvodniListService>(ProizvodniListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
