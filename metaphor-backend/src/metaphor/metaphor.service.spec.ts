import { Test, TestingModule } from '@nestjs/testing';
import { MetaphorService } from './metaphor.service';

describe('MetaphorService', () => {
  let service: MetaphorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetaphorService],
    }).compile();

    service = module.get<MetaphorService>(MetaphorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
