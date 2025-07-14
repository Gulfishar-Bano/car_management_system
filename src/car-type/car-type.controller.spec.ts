import { Test, TestingModule } from '@nestjs/testing';
import { CarTypeController } from './car-type.controller';

describe('CarTypeController', () => {
  let controller: CarTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarTypeController],
    }).compile();

    controller = module.get<CarTypeController>(CarTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
