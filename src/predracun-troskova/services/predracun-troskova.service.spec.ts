import { Test, TestingModule } from '@nestjs/testing';
import { PredracunTroskovaService } from './predracun-troskova.service';

describe('PredracunTroskovaService', () => {
  let service: PredracunTroskovaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PredracunTroskovaService],
    }).compile();

    service = module.get<PredracunTroskovaService>(PredracunTroskovaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
