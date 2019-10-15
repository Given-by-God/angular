import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'makeTable'
})
export class MakeTablePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);


    let arr = 
    ["tets","second","third"]

    return arr;
  }

}
