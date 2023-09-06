import { Injectable } from '@angular/core';
import { User } from '../../Interface/User';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoggedInUserService {

  constructor() { }

  private loggedInUserInfo: BehaviorSubject<User> = new BehaviorSubject<any>(  {firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: new Date(),
  address:undefined ,
  gender: '',
    isVerified: false,
});

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  setLoggedInUserInfo(data: User): void {
    this.loggedInUserInfo.next(data);
  }

  getLoggedInUserInfo(): Observable<User> {
    return this.loggedInUserInfo.asObservable();
  }

  setLoggedInStatus(value: boolean): void {
    this.isLoggedIn.next(value);
  }

  getLoggedInStatus(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

}
