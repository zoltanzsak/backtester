import { TickerDataEntity } from '../../modules/ticker-data/entities/ticker-data.entity';
import * as fs from 'fs';
import { parseISO, isValid } from 'date-fns';

/**
 * Maps a csv export from https://coinmarketcap.com/currencies/bitcoin/historical-data/ to TickerDataEntity[]
 * @param path path for csv files
 * @param separator character that split "cells" in CSV
 * @param mappings Mapping rules - {key of TickerDataEntity: header in csv}
 * @returns TickerDataEntity array
 */
export function transformCsvToTickerDataEntityArray(
  path: string,
  separator: string,
  mappings: Record<keyof TickerDataEntity, string>,
): TickerDataEntity[] {
  try {
    const csvRawData = fs.readFileSync(path, 'utf8');

    const rows = csvRawData.split('\n').filter(Boolean);

    const [headerRow, ...dataRows] = rows;

    const csvHeaders = headerRow.split(separator).map((h) => h.trim());

    const unmappedHeaders = Object.values(mappings).filter(
      (mappingValue) =>
        !csvHeaders.some(
          (header) => header.toLowerCase() === mappingValue.toLowerCase(),
        ),
    );

    if (unmappedHeaders.length > 0) {
      throw new Error(
        `Header(s) cannot be transformed to '${unmappedHeaders.join(', ')}'`,
      );
    }

    return dataRows.map((row) => {
      const values = row.split(separator).map((v) => v.trim());
      const entity = {} as TickerDataEntity;

      Object.entries(mappings).forEach(([entityKey, csvHeader]) => {
        const columnIndex = csvHeaders.findIndex(
          (header) => header.toLowerCase() === csvHeader.toLowerCase(),
        );

        if ((entityKey as keyof TickerDataEntity) === 'timeStamp') {
          const timeStampValue = values[columnIndex];
          const normalizedTimeStamp = timeStampValue.replace(/"/g, '');
          const parsedTimeStamp = parseISO(normalizedTimeStamp);

          if (!isValid(parsedTimeStamp)) {
            throw new Error('Invalid timestamp: ' + timeStampValue);
          }
          entity[entityKey] = parsedTimeStamp;
        } else {
          entity[entityKey] = values[columnIndex];
        }
      });

      return entity;
    });
  } catch (e) {
    console.error(`Error Happened during reading CSV: ${path} \nError: ${e}`);
    return [];
  }
}
