import { Pipe, PipeTransform } from '@angular/core';
import { find } from 'lodash';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return args[1] === -1 ? value : value.filter(item => item[args[0]] === args[1]);
  }
}

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args: any[]) {
    if (args[1]) {
      return value.filter(function (el: any) {
        return el[args[0]].toLowerCase().indexOf(args[1].toLowerCase()) > -1;
      });
    }
    return value;
  }
}
