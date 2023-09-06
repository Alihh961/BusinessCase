import {Component, OnInit} from '@angular/core';
import {Nft} from "../Interface/Nft";
import {NftService} from "../services/nft/nft.service";
import {CookieService} from "../services/cookie/cookie.service";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  searchInputValue: string = '';
  orderBy: string = "";
  nfts: Array<Nft> = [];
  numberOfNftsToShow: number = 7;
  nftTotalquantity ?: number;
  showMoreButtonStatus: boolean = true;

  // checked radio button is all by default
  subCategoryFilterValue: string = "";

  constructor(private nftService: NftService , private CookieService :CookieService) {
  }


  hovered: boolean = false;

  ngOnInit(): void {
    this.getAllNfts();
    this.getAllNftsQuantity();
  }

  showes(){
  //   console.log(this.CookieService.getUserInfo());
  }

  // get all nfts
  getAllNfts(): void {
    this.nftService.getAllNfts(this.numberOfNftsToShow).subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          data[i].image.url = "assets/imgs/nfts/" + data[i].image.url;
        }
        this.nfts = data;
      },
      error => {
        console.log(error);
      }
    )
  }


  // If a filter is added
  getFilteredNfts(): void {
    this.nftService.getFilteredNfts(this.searchInputValue, this.subCategoryFilterValue, this.orderBy, this.numberOfNftsToShow).subscribe(
      (data: Nft[]): void => {
        for (let i = 0; i < data.length; i++) {
          data[i].image.url = "assets/imgs/nfts/" + data[i].image.url;
        }
        this.nfts = data;

      },
      error => {
        console.error(error);
      }
    )


  }

  onSearchTextEntered(inputValue: string): void {
    this.searchInputValue = inputValue;
    this.getFilteredNfts();
  }

  // filtering results when the radio button is changed
  onFilterSelectionChanged(data: string): void {

    this.subCategoryFilterValue = data;
    this.getFilteredNfts();
  }


  // check the total number of nfts ,so we hide the button when all nfts are displayed
  getAllNftsQuantity() {
    this.nftService.getAllNftsQuantity().subscribe(
      quantity => {
        this.nftTotalquantity = quantity;
      }
    )
  }

  // show more nfts if there is more on button clicked
  showMoreNfts() {
    this.numberOfNftsToShow += 5;

    if (this.nftTotalquantity) {
      if (this.numberOfNftsToShow >= this.nftTotalquantity) {
        this.showMoreButtonStatus = false;
      }
    }
    this.getFilteredNfts();
    this.getAllNfts();
  }

}
