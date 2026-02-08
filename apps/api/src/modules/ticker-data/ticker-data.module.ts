import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TickerDataEntity } from './entities/ticker-data.entity';
import { TickerDataController } from './ticker-data.controller';
import { TickerDataService } from './ticker-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([TickerDataEntity])],
  controllers: [TickerDataController],
  providers: [TickerDataService],
})
export class TickerDataModule {}
