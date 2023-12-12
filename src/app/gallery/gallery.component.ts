import {Component, OnInit} from '@angular/core';
import {Nft} from "../_Interface/Nft";
import {NftService} from "../_services/nft/nft.service";
import {StartupService} from "../_services/startUp/startup.service";
import {uploadsApiUrl} from "../../environment/environment";
import {SubcategoryService} from "../_services/subcategory/subcategory.service";
import {CookieService} from "../_services/cookie/cookie.service";
import Swal from 'sweetalert2';


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

  constructor(private nftService: NftService, private startUpService: StartupService, private subCategoryService: SubcategoryService,
              private cookieService: CookieService) {
  }


  hovered: boolean = false;

  ngOnInit(): void {
    this.getAllNfts();
    this.getAllNftsQuantity();
    this.setAscDesc();
  }

  setAscDesc() {
    this.subCategoryService.ascDescValue.subscribe(
      value => {
        this.orderBy = value;
      }
    )
  }

  // get all nfts
  getAllNfts(): void {
    if (this.numberOfNftsToShow == 7) {
      this.startUpService.setLoadingStatus(true);
    }
    this.nftService.getAllNfts(this.numberOfNftsToShow).subscribe(
      data => {

        for (let i = 0; i < data.length; i++) {
          data[i].image.url = uploadsApiUrl + data[i].image.url;
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
    console.log("inputValue:" + this.searchInputValue, "sub" + this.subCategoryFilterValue, "order" + this.orderBy, "number" + this.numberOfNftsToShow);
 
    this.nftService.getFilteredNfts(this.searchInputValue, this.subCategoryFilterValue, this.orderBy, this.numberOfNftsToShow).subscribe(
      (data: Nft[]): void => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          data[i].image.url = uploadsApiUrl + data[i].image.url;

        }
        this.nfts = data;

      },
      error => {
        // empty the nfts Array to change the view of gallery
        if (error.status == 400) {
          this.nfts = [];
        }
        console.error(error);
      }
    )


  }

  onSearchTextEntered(inputValue: string): void {
    if (this.nftTotalquantity) {// show all the results of the search without show button and without max number of nfts
      this.numberOfNftsToShow = this.nftTotalquantity;
    }
    if (!inputValue) { // when the search input is empty , we will show the button
      this.showMoreButtonStatus = true;
      this.numberOfNftsToShow = 7;
    } else {
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


  addToDashboard(event: Event) {
    const button: HTMLElement = event.target as HTMLElement;
    const nftId: string | null = button.getAttribute("id");
    const token: string = this.cookieService.getToken();

    if (nftId && token) [
      this.nftService.addNftToUser(nftId, token).subscribe(
        response => {
          Swal.fire(
            "Cool",
            response.message,
            "success"
          )
        },
        error => {
          Swal.fire(
            "Error",
            "Something went wrong",
            "error"
          )
        }
      )

    ]

  }
}
