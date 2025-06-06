import { Test, TestingModule } from '@nestjs/testing';
import { GodisnjiPlanController } from './godisnji-plan.controller';
import { GodisnjiPlanService } from '../services/godisnji-plan.service';

describe('GodisnjiPlanController', () => {
  let controller: GodisnjiPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GodisnjiPlanController],
      providers: [GodisnjiPlanService],
    }).compile();

    controller = module.get<GodisnjiPlanController>(GodisnjiPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
