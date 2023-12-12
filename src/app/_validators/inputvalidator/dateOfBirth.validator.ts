import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DateOfBirthValidator {

  constructor() { }

  ageIsValid(control: FormControl): boolean {
    const currentDate :Date = new Date();
    const currentYear :number = currentDate.getFullYear();
    const currentMonth :number = currentDate.getMonth() + 1; // Adding 1 since getMonth() returns zero-based index
    const currentDay:number = currentDate.getDate();

    const birthdate :Date = new Date(control.value);
    const birthYear :number = birthdate.getFullYear();
    const birthMonth: number = birthdate.getMonth() + 1;
    const birthDay: number = birthdate.getDate();

    const ageYears :number = currentYear - birthYear;
    const ageMonths :number = currentMonth - birthMonth;
    const ageDays :number = currentDay - birthDay;


    if (ageYears > 18) {
      return true; // Valid age
    }else if(ageYears == 18 && ageMonths >= 0 && ageDays >= 0){// we check the month and the day, he must have at least
      // the same day and month to be at least 18 years old otherwise he is 17 years old
      //if the current month is May and this Birth month is april then he is not 18 yet , and if his birth month is May
      // we will check the day of the month
      return true; // Valid age
    }

    return false; // Age is less than 18
  }

}
