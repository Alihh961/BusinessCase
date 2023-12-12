import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
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
    // we use this service to toggle a class into the body when loading the startup component so we add
    // overflow hidden to the body
    this.toggleBodyService.setToggleClass(value);
    this.loadingStatus.next(value);

  }


}
