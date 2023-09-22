import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiURL} from "../../../environment/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http : HttpClient) { }


  sendMessageContact(formData :any) :Observable<Object>{
    return this.http.post(`${apiURL}contact` , formData);
  }

}
