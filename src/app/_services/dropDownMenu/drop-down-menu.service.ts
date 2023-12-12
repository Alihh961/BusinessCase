import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DropDownMenuService {

  constructor() { }

  private dropDownMenuStatusSubject = new BehaviorSubject<boolean>(false);
  dropDownMenuStatus$ = this.dropDownMenuStatusSubject.asObservable();

  setDropDownMenu(value :boolean){
    this.dropDownMenuStatusSubject.next(value);
  }

  getDropDownMenuValue(): Observable<boolean>{
    return this.dropDownMenuStatus$;
  }


}
