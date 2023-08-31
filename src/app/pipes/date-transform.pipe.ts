import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})

export class DateFormatPipe implements PipeTransform {

  transform(value: Date) :string {
    let date = new Date(value);
    let year :number = date.getFullYear();
    let month:number = date.getMonth() +1;
    let day :number = date.getDate();

    return `${day}-${month}-${year}`;

  }


}

@Pipe({
  name: 'console'
})

export class Console implements PipeTransform {

  transform(value: any): any {


    return console.log(value[1]);

  }
}
