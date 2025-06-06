import { Test, TestingModule } from '@nestjs/testing';
import { GodisnjiPlanService } from './godisnji-plan.service';

describe('GodisnjiPlanService', () => {
  let service: GodisnjiPlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GodisnjiPlanService],
    }).compile();

    service = module.get<GodisnjiPlanService>(GodisnjiPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
