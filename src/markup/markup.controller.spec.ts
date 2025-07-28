import { Test, TestingModule } from '@nestjs/testing';
import { MarkupController } from './markup.controller';

describe('MarkupController', () => {
  let controller: MarkupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarkupController],
    }).compile();

    controller = module.get<MarkupController>(MarkupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
