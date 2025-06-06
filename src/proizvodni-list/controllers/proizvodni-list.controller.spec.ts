import { Test, TestingModule } from '@nestjs/testing';
import { ProizvodniListController } from './proizvodni-list.controller';
import { ProizvodniListService } from '../services/proizvodni-list.service';

describe('ProizvodniListController', () => {
  let controller: ProizvodniListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProizvodniListController],
      providers: [ProizvodniListService],
    }).compile();

    controller = module.get<ProizvodniListController>(ProizvodniListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
