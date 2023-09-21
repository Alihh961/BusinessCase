import {Injectable} from '@angular/core';
import {Observable, map, catchError, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {baseURL} from "../../environment/environment";
import {CookieService} from "./cookie/cookie.service";

@Injectable({
  providedIn: 'root'
})
export class UploadfileService {

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  postFile(fileToUpload: File) {

    const token :string = this.cookieService.getToken();
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    const httpOptions = {
      headers: headers
    };

    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return formData;
    return this.http.post(`${baseURL}contact`, formData, httpOptions)
      .pipe(
        map(() => true),
        catchError((error: any) => {
          console.error(error);
          return of(false);
        })
      );
  }
}
