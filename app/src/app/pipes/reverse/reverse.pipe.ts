import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  standalone: true
})
export class ReversePipe implements PipeTransform {

  public transform(value: string, ...args: unknown[]): unknown {
    let reversedString: string = "";
    if (value) {
      for (let i = value.length-1 ; i >= 0 ; i--) {
        reversedString += value[i];
      }
    }
    return reversedString;
  }

}
