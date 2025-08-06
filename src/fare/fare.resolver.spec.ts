import { Test, TestingModule } from '@nestjs/testing';
import { FareResolver } from './fare.resolver';

describe('FareResolver', () => {
  let resolver: FareResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FareResolver],
    }).compile();

    resolver = module.get<FareResolver>(FareResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
