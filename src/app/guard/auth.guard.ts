import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {UserService} from "../services/user/user.service";
import {AuthenticationService} from "../services/auth/authentication.service";
import {StartupService} from "../services/startUp/startup.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router, private startUpService: StartupService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.startUpService.setLoadingStatus(true);
    // the guard here will check if we have a valid token that returns an user then it will display the page
    return this.authService.isAuthenticated().pipe(
      switchMap((response: boolean) => {
        if (response) {
          this.startUpService.setLoadingStatus(false);

          return [true];
        } else {
          this.startUpService.setLoadingStatus(false);

          this.router.navigate(["login"]);
          return [false];
        }
      })
    );
  }

}
