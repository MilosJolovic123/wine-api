import { Test, TestingModule } from '@nestjs/testing';
import { ZaposleniService } from './zaposleni.service';

describe('ZaposleniService', () => {
  let service: ZaposleniService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZaposleniService],
    }).compile();

    service = module.get<ZaposleniService>(ZaposleniService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
