import { Test, TestingModule } from '@nestjs/testing';
import { CarTypeResolver } from './car-type.resolver';

describe('CarTypeResolver', () => {
  let resolver: CarTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarTypeResolver],
    }).compile();

    resolver = module.get<CarTypeResolver>(CarTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
