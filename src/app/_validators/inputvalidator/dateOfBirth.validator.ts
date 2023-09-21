import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DateOfBirthValidator {

  constructor() { }

  ageIsValid(control: FormControl): boolean {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Adding 1 since getMonth() returns zero-based index
    const currentDay = currentDate.getDate();

    const birthdate = new Date(control.value);
    const birthYear = birthdate.getFullYear();
    const birthMonth = birthdate.getMonth() + 1;
    const birthDay = birthdate.getDate();

    const ageYears = currentYear - birthYear;
    const ageMonths = currentMonth - birthMonth;
    const ageDays = currentDay - birthDay;


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
