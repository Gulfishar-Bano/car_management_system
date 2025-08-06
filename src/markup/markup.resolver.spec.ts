import { Test, TestingModule } from '@nestjs/testing';
import { MarkupResolver } from './markup.resolver';

describe('MarkupResolver', () => {
  let resolver: MarkupResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarkupResolver],
    }).compile();

    resolver = module.get<MarkupResolver>(MarkupResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
