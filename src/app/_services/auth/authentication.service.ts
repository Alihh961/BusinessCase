import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, switchMap, tap, catchError, BehaviorSubject, filter, map, of, observable} from 'rxjs';
import {throwError} from 'rxjs';
import {apiURL} from 'src/environment/environment';
import {User, UserLogin} from "../../_Interface/User";
import {Itoken} from "../../_Interface/Token";
import {CookieService} from "../cookie/cookie.service";
import {UserService} from "../user/user.service";



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private testToken: BehaviorSubject<string> = new BehaviorSubject<string>("");
  testToken$ = this.testToken.asObservable();

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private userService: UserService,
  ) {
  }

  login(credentials: UserLogin): Observable<User | any> {
    let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Itoken>(`${apiURL}login_check`, credentials, {headers: headers}).pipe(
      switchMap((data: Itoken) => {
        localStorage.setItem("token" , data.token);
        this.cookieService.setToken(data.token);
        this.cookieService.setTokenInService(data.token);
        this.testToken.next(data.token);
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

    if (this.cookieService.getToken()) {
      const token: string = this.cookieService.getToken();
      return this.getUser(token).pipe(
        map(response => response instanceof Object && "firstName" in response),
        catchError(error => {
          return of(false);
        })
      );
    } else {
      return of(false);
    }
  }


  logout() {
    this.cookieService.removeCookie('token');
    this.userService.setLoggedUserStatus(false);

  }

}
