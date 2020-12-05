import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateConverter'
})
export class DateConverterPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (typeof value === 'string') {

      const joinPattern = (args) ? ((args[0]) ? args[0] : '-') : '-';
      return value.slice(0, 10).split('-').reverse().join(joinPattern);
    } else {
      return value;
    }
  }
}
