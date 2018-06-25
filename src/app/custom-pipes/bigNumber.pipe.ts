import { Pipe, PipeTransform } from '@angular/core';


//A pipe to help display big number such as 1000000 as 1M. The base can be chaged and the suffixes can be provided in order as a string array.

@Pipe({name: 'bigNumber'})
export class BigNumber implements PipeTransform {
  transform(value: number,base:number=1000,suffix:string[]=['','Thousand','Million','Billion','Trillion']): string {
    let count=0;
    while(value > base){
        count++;
        value=value/base
    }
    return `${parseFloat(value.toFixed(3))} ${suffix[count]}`;

  }
}