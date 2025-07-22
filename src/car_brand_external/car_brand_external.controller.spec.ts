import { Test, TestingModule } from '@nestjs/testing';
import { CarBrandExternalController } from './car_brand_external.controller';

describe('CarBrandExternalController', () => {
  let controller: CarBrandExternalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarBrandExternalController],
    }).compile();

    controller = module.get<CarBrandExternalController>(CarBrandExternalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
