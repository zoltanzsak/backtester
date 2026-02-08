import { Controller, Get, Logger } from '@nestjs/common';
import { TickerDataEntity } from './entities/ticker-data.entity';
import { TickerDataService } from './ticker-data.service';

@Controller('ticker-data')
export class TickerDataController {
  private readonly logger = new Logger(TickerDataController.name);
  constructor(private tickerDataService: TickerDataService) {}
  @Get()
  async getTickerData(): Promise<TickerDataEntity[]> {
    this.logger.log('Requesting ticker data');
    return await this.tickerDataService.getTickerData();
  }
}
