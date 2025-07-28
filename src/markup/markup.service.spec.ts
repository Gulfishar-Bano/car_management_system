import { Test, TestingModule } from '@nestjs/testing';
import { MarkupService } from './markup.service';

describe('MarkupService', () => {
  let service: MarkupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarkupService],
    }).compile();

    service = module.get<MarkupService>(MarkupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
