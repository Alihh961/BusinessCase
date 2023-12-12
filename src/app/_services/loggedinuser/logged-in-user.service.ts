import {Injectable} from '@angular/core';
import {LoggedUser, User} from '../../_Interface/User';
import {BehaviorSubject, Observable} from 'rxjs';
import {Iaddress} from "../../_Interface/Address";


@Injectable({
  providedIn: 'root'
})


export class LoggedInUserService {

  constructor() {
  }


  private loggedInUserInfo: BehaviorSubject<User> = new BehaviorSubject<User>({
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      gender: "",
      address: {
        id: null,
        municipality: "",
        department: "",
        region: "",
        path: "",
        buildingNumber: null,
        postCode: null,
      },
      dateOfBirth: null,
      isVerified: false,
    }
  )
  ;

  loggedInUserInfo$: Observable<User> = this.loggedInUserInfo.asObservable();

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();


  setLoggedInUserInfo(data: User ):void {
    this.loggedInUserInfo.next(data);
  }



  setLoggedInStatus(value : boolean ):void {
    this.isLoggedIn.next(value);
  }


}
