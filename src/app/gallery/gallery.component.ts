import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Nfts} from "../Interface/Itoken";
import {apiURL} from "../../environment/environment";
import {SubName} from "../Interface/SubCategory";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  searchInputValue: string = '';
  orderBy:string = "";
  nfts: Array<Nfts> = [];

  // checked radio button is all by default
  subCategoryFilterValue: string = "";

  constructor(private http: HttpClient) {
  }



  ngOnInit() {
    this.getNfts();

  }

  getNfts() {
console.log("out");
    this.http.get<Nfts[]>(`${apiURL}nft?n=${this.searchInputValue}&s=${this.subCategoryFilterValue}&o=${this.orderBy}`).subscribe(
      (data: Nfts[]): void => {

        for (let i = 0; i < data.length; i++) {
          switch (true) {
            case data[i].image != null :
              data[i].image.url = "assets/imgs/nfts/" + data[i].image.url;
              break;

            case data[i].video != null :
              data[i].video.url = "assets/imgs/nfts/" + data[i].video.url;
              break;

            case data[i].audio != null :
              data[i].audio.url = "assets/imgs/nfts/" + data[i].audio.url;
          }
        }

        this.nfts = data;


      },
      error => {
        console.error(error);
      }
    )


  }



  onSearchTextEntered(inputValue: string) {
    this.searchInputValue = inputValue;
    this.getNfts();
  }

  hovered: boolean = false;


  // displaying the qty of each filter option
  getAllTokensQty() {
    return this.nfts.length;
  }

  getTransferableTokensQty() {
    return 1;
    // return this.tokens.filter(token => token.type === "transferable").length;
  }

  getNonTransferableTokensQty() {
    return 1;
    // return this.tokens.filter(token => token.type === "non-transferable").length;
  }




  // filtering results when the radio button is changed
  onFilterSelectionChanged(data: string) {

    this.subCategoryFilterValue = data;
    this.getNfts();
  }


}
