import { Test, TestingModule } from '@nestjs/testing';
import { PredracunTroskovaService } from '../services/predracun-troskova.service';
import { PredracunTroskovaController } from './predracun-troskova.controller';

describe('PredracunTroskovaController', () => {
  let controller: PredracunTroskovaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PredracunTroskovaController],
      providers: [PredracunTroskovaService],
    }).compile();

    controller = module.get<PredracunTroskovaController>(PredracunTroskovaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
