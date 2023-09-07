import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FeatureCollection} from "../../Interface/Address";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http :HttpClient) { }

  getAddressFromExternalApi(value :string) :Observable<FeatureCollection>{
    let url:string = `https://api-adresse.data.gouv.fr/search/?q=${value}&limit=10`;
    return this.http.get<FeatureCollection>(url);
  }
}
