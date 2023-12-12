import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import { CookieService} from "../cookie/cookie.service";
@Injectable()
export class HttpinterceptorInterceptor implements HttpInterceptor {

  constructor(private cookieService :CookieService ) {}

 token :string = this.cookieService.getToken();


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.token){
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
    }

  return next.handle(request);


}
  }
