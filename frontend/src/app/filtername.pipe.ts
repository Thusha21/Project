import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtername'
})
export class FilternamePipe implements PipeTransform {

  transform(value: Array<any>, args?: any): any {
    return null;
    
  }

}
