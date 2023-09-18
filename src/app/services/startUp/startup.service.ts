import {Injectable} from '@angular/core';
import {AuthenticationService} from "../auth/authentication.service";
import {CookieService} from "../cookie/cookie.service";
import {isObject} from "chart.js/helpers";
import {UserService} from "../user/user.service";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../Interface/User";
import {TogglebodyclassService} from "../body/togglebodyclass.service";

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  private loadingStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingStatus$ = this.loadingStatus.asObservable();

  constructor(private toggleBodyService: TogglebodyclassService
  ) {
  }


  setLoadingStatus(value: boolean) {
    this.toggleBodyService.setToggleClass(value);
    this.loadingStatus.next(value);

  }

  getLoadingStatus(): boolean {
    return this.loadingStatus.value;
  }

}
