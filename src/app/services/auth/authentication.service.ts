import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, switchMap, tap, catchError, BehaviorSubject, filter, map, of} from 'rxjs';
import {throwError} from 'rxjs';
import {apiURL} from 'src/environment/environment';
import {User, UserLogin} from "../../Interface/User";
import {Itoken} from "../../Interface/Token";
import {CookieService} from "../cookie/cookie.service";
import {UserService} from "../user/user.service";
import {response} from "express";
import {StartupService} from "../startUp/startup.service";


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {


    private userBehavior = new BehaviorSubject<User | null>(null); //**//
    readonly user$ = this.userBehavior.asObservable().pipe(//**//
        filter(response => !response)
    );

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                private userService: UserService,
               ) {
    }

    login(credentials: UserLogin): Observable<User | any> {
        let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post<Itoken>(`${apiURL}login_check`, credentials, {headers: headers}).pipe(
            switchMap((data: Itoken) => {
                this.cookieService.setToken(data.token);
                return this.getUser(data.token);
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError('Error getting token');
            })
        );
    }


    getUser(token: string): Observable<User | any> {

        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });
        const httpOptions = {
            headers: headers
        };
        return this.http.get<User>(`${apiURL}user`, httpOptions).pipe(
            catchError((error: HttpErrorResponse) => {
                this.cookieService.removeCookie("token");// remove the token if login failled
                return throwError("Errrrrrror")
            }));
    }


  isAuthenticated(): Observable<boolean> {

      if(this.cookieService.getToken()){
    const token: string = this.cookieService.getToken();
    return this.getUser(token).pipe(
      map(response => response instanceof Object && "firstName" in response),
      catchError(error => {
        return of(false);
      })
    );}else{
        return of(false);
      }
  }

    logout() {
        this.cookieService.removeCookie('token');
        this.userService.setLoggedUserStatus(false);

    }

}
