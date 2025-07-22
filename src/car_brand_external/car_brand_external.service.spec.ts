import { Test, TestingModule } from '@nestjs/testing';
import { CarBrandExternalService } from './car_brand_external.service';

describe('CarBrandExternalService', () => {
  let service: CarBrandExternalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarBrandExternalService],
    }).compile();

    service = module.get<CarBrandExternalService>(CarBrandExternalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
