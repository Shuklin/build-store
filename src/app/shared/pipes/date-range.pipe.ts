import { Pipe, PipeTransform } from '@angular/core';
import moment from "moment";
// import * as moment from 'moment'

@Pipe({
  name: 'dateRange',
  standalone: true
})
export class DateRangePipe implements PipeTransform {
  transform(dataArray: Array<any>, dateFrom: Date | undefined, dateTo: Date | undefined): Array<any> {
    if (!dataArray) return dataArray;

    return dataArray.filter(obj => {
      const dateValueMoment = moment(obj.dateRequested, 'DD.MM.YYYY');

      const isDownOutOfRange = dateFrom && moment(dateFrom).isAfter(dateValueMoment);
      const isUpOutOfRange = dateTo && moment(dateTo).isBefore(dateValueMoment);

      return !isDownOutOfRange && !isUpOutOfRange
    })
  }
}
