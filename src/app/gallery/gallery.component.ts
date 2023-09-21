import {Component, OnInit} from '@angular/core';
import {Nft} from "../_Interface/Nft";
import {NftService} from "../_services/nft/nft.service";
import {StartupService} from "../_services/startUp/startup.service";



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

  constructor(private nftService: NftService,private startUpService : StartupService) {
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
    if(this.numberOfNftsToShow == 7){
    this.startUpService.setLoadingStatus(true);
    }
    this.nftService.getAllNfts(this.numberOfNftsToShow).subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          data[i].image.url = "https://127.0.0.1:8000/uploads/" + data[i].image.url;
        }
        this.nfts = data;
        this.startUpService.setLoadingStatus(false);

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
          data[i].image.url = "https://127.0.0.1:8000/uploads/" + data[i].image.url;
        }
        this.nfts = data;

      },
      error => {
        console.error(error);
      }
    )


  }

  onSearchTextEntered(inputValue: string): void {
    if(this.nftTotalquantity) {// show all the results of the search without show button and without max number of nfts
      this.numberOfNftsToShow = this.nftTotalquantity;
    }
    if(!inputValue){ // when the search input is empty , we will show the button
      this.showMoreButtonStatus = true;
      this.numberOfNftsToShow = 7;
    }else{
      this.showMoreButtonStatus = false;// hide the button when we search because no more max number of nft to show
    }

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
// we chek when we reach the max number of nfts in database then we hide the show button
    if (this.nftTotalquantity) {
      if (this.numberOfNftsToShow >= this.nftTotalquantity) {
        this.showMoreButtonStatus = false;
      }
    }
    this.getFilteredNfts();
    // this.getAllNfts();
  }

}
