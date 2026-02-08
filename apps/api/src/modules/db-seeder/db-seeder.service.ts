import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TickerDataEntity } from '../ticker-data/entities/ticker-data.entity';
import { transformCsvToTickerDataEntityArray } from '../../utils/transformers/initial-csv-to-tickerdata-entity';
import { fetchYesterdaysData } from '../../utils/fetch-yesterdays-data';

@Injectable()
export class DbSeederService {
  constructor(
    @InjectRepository(TickerDataEntity)
    private readonly tickerDataRepository: Repository<TickerDataEntity>,
  ) {}
  private readonly logger = new Logger(DbSeederService.name);

  async triggerSeed() {
    const isExist = await this.tickerDataRepository.exists();
    const hasData = Boolean(await this.tickerDataRepository.count());

    this.logger.log('IE, HD', isExist, hasData);

    if (!hasData || !isExist) {
      const initialData = transformCsvToTickerDataEntityArray(
        '../../data/BTC-DAILY.csv',
        ';',
        {
          close: 'close',
          high: 'high',
          low: 'low',
          open: 'open',
          timeStamp: 'timeOpen',
          volume: 'volume',
        },
      );
      const newEntities = this.tickerDataRepository.create(initialData);
      await this.tickerDataRepository.save(newEntities);
      this.logger.log(`Seeding ${newEntities.length} Ticker data`);
      return newEntities;
    }

    // const yesterdaysRecord = await fetchYesterdaysData();
    // TODO: Fetch data to keep up-to-date
  }

  @Cron('0 0 0 * * 1-7')
  async handleCron() {
    await this.triggerSeed();
    this.logger.debug('Called when the current second is 45');
  }
}
