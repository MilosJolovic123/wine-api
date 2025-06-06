import { Test, TestingModule } from '@nestjs/testing';
import { RezervisaneKolicineController } from './rezervisane-kolicine.controller';
import { RezervisaneKolicineService } from '../services/rezervisane-kolicine.service';

describe('RezervisaneKolicineController', () => {
  let controller: RezervisaneKolicineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RezervisaneKolicineController],
      providers: [RezervisaneKolicineService],
    }).compile();

    controller = module.get<RezervisaneKolicineController>(RezervisaneKolicineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
