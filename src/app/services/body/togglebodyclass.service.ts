import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {StartupService} from "../startUp/startup.service";

@Injectable({
  providedIn: 'root'
})
export class TogglebodyclassService {

  // we use this service to toggle a class into the body when loading the startup component so we add
  // overflow hidden to the body


  private toggleClass: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  toggleClass$ = this.toggleClass.asObservable();

  constructor() {
  }

  ngOnInit(): void {
  }


  setToggleClass(value: boolean): void {
    this.toggleClass.next(value);
  }


}
