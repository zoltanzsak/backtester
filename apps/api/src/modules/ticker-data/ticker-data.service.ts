import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TickerDataEntity } from './entities/ticker-data.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TickerDataService {
  private readonly logger = new Logger(TickerDataService.name);
  constructor(
    @InjectRepository(TickerDataEntity)
    private readonly tickerDataRepository: Repository<TickerDataEntity>,
  ) {}

  async getTickerData(): Promise<TickerDataEntity[]> {
    this.logger.log('Requesting ticker data');
    return await this.tickerDataRepository.find({});
  }
}
