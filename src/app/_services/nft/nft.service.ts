import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Nft} from "../../_Interface/Nft";
import {apiURL} from "../../../environment/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NftService {

  constructor(
    private http :HttpClient
  ) { }

  // filtered NFTs
  getFilteredNfts( searchInputValue :string , subCategoryName :string , orderBy :string , numberOfNftToShow :number) :Observable<Nft[]>{
    return this.http.get<Nft[]>(`${apiURL}nfts?n=${searchInputValue}&s=${subCategoryName}&o=${orderBy}&m=${numberOfNftToShow}`)
  }

  // get all NFTs
  getAllNfts(maxNumberOfNfts :number):Observable<Nft[]>{
    return this.http.get<Nft[]>(`${apiURL}nfts?m=${maxNumberOfNfts}`);

  }

  getAllNftsQuantity():Observable<number>{
   return  this.http.get<number>(`${apiURL}nftsquantity`);
  }


}

