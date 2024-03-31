import { Injectable } from '@angular/core';

interface Data {
  time: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatahelperService {
   sumValuesForMatchingDates(...dataArray: Data[][]): Record<string, number> {
    const result: Record<string, number> = {};

    for (const data of dataArray) {
      const mapData = new Map(data.map(entry => [entry.time, entry.value]));

      for (const [time, value] of mapData) {
        if (result[time]) {
          result[time] += value;
        } else {
          result[time] = value;
        }
      }
    }

    return result;
  }

}
