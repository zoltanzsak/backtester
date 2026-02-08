import { Test, TestingModule } from '@nestjs/testing';
import { TickerDataService } from './ticker-data.service';

describe('TickerDataService', () => {
  let service: TickerDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TickerDataService],
    }).compile();

    service = module.get<TickerDataService>(TickerDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
