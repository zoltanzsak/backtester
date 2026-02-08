import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TickerDataEntity } from '../ticker-data/entities/ticker-data.entity';
import { TickerDataService } from '../ticker-data/ticker-data.service';
import { DbSeederService } from './db-seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([TickerDataEntity])],
  providers: [DbSeederService, TickerDataService],
})
export class DbSeederModule {}
