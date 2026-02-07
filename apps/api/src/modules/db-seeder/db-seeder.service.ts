import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class DbSeederService {
  private readonly logger = new Logger(DbSeederService.name);

  // TODO: service that actually seeds db
  /**
   * Seeding means:
   * pull the BTC data (1MIN Timeframe) for last 5 years
   * if data is present - remove last day, and add one day
   */
  // TODO: Controller with api endpoint to call it manually.

  @Cron('45 * * * * *') // TODO: Ideally once per day at 0AM CET
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }
}
