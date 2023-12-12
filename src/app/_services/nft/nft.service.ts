import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Nft} from "../../_Interface/Nft";
import {apiURL} from "../../../environment/environment";
import {Observable} from "rxjs";
import {Token} from "@angular/compiler";
import {Itoken} from "../../_Interface/Token";
import {CookieService} from "../cookie/cookie.service";

@Injectable({
  providedIn: 'root'
})
export class NftService {

  constructor(
    private http: HttpClient,private cookieService : CookieService
  ) {
  }

  // filtered NFTs
  getFilteredNfts(searchInputValue: string, subCategoryName: string, orderBy: string, numberOfNftToShow: number): Observable<Nft[]> {
    return this.http.get<Nft[]>(`${apiURL}nfts?n=${searchInputValue}&s=${subCategoryName}&o=${orderBy}&m=${numberOfNftToShow}`)
  }

  // get all NFTs
  getAllNfts(maxNumberOfNfts: number): Observable<Nft[]> {
    return this.http.get<Nft[]>(`${apiURL}nfts?m=${maxNumberOfNfts}`);

  }

  getAllNftsQuantity(): Observable<number> {
    return this.http.get<number>(`${apiURL}nftsquantity`);
  }

  getNftsOfUser(token: string) {
    return this.http.get<Nft[]>(`${apiURL}get-user-nfts?t=${token}`);
  }

  addNftToUser(nftId: string, token: string) {

    return this.http.post<any>(`${apiURL}add-nft-to-user`, {token: token, nftId: nftId});

  }

  deleteNftOfUser(id: number ) {
    const token :string = this.cookieService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete(`${apiURL}delete-nft-of-user/${id}`, {headers});
  }

}

