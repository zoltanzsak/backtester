import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { DbSeederModule } from './modules/db-seeder/db-seeder.module';
import { TickerDataEntity } from './modules/ticker-data/entities/ticker-data.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../../.env' }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_CONNECTION_STRING,
      autoLoadEntities: true,
      synchronize: false, // TODO: MUST BE FALSE IN PROD ENV!
      entities: [TickerDataEntity],
    }),
    DbSeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
