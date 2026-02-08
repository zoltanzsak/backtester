import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('ticker_data')
export class TickerDataEntity {
  @PrimaryColumn({ unique: true })
  timeStamp: Date;

  @Column('float')
  open: string;

  @Column('float')
  close: string;

  @Column('float')
  high: string;

  @Column('float')
  low: string;

  @Column('float')
  volume: string;
}
