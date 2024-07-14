import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(dataArray: Array<any>, field: string, filterArray: Array<string>): Array<any> {
    if (!dataArray || !field || !filterArray) return dataArray;

    if (filterArray.length === 0) return dataArray;

    return dataArray.filter(obj => filterArray.includes(obj[field])
    )
  }
}
