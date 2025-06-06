import { Test, TestingModule } from '@nestjs/testing';
import { ZaposleniController } from './zaposleni.controller';

describe('ZaposleniController', () => {
  let controller: ZaposleniController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZaposleniController],
    }).compile();

    controller = module.get<ZaposleniController>(ZaposleniController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
