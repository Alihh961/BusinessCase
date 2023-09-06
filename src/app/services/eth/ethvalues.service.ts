import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Eth} from "../../Interface/Eth";
import {apiURL} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class EthvaluesService {

  constructor(private http: HttpClient) {
  }

  private url :string = `${apiURL}eth`;
  getValues(): Observable<Eth[]> {
    return this.http.get<Eth[]>(this.url);
  };

}
