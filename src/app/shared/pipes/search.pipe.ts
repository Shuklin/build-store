import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchId',
  standalone: true
})
export class SearchIdPipe implements PipeTransform {
  transform(dataArray: Array<any>, searchLine: string): Array<any> {
    if (!dataArray || !searchLine) return dataArray;

    if (searchLine === '') return dataArray;

    return dataArray.filter(obj => obj['id'].toString().indexOf(searchLine) !== -1)
  }
}
