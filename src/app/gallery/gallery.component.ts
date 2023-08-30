import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Nfts} from "../Interface/Itoken";


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  searchInputValue: string = '';
  constructor(private http: HttpClient) {
  }


  //* Calling tokens to display in Gallery view template

  tokens: Array<Nfts> = [];

  ngOnInit() {
    this.getNfts();

  }

  getNfts() {

    this.http.get<Nfts[]>('https://127.0.0.1:8000/api/nft?v=' + this.selectedRadioButton).subscribe(
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
        this.tokens = data;

      },
      error => {
        console.error(error);
      }
    )


  }



  onSearchTextEntered(searchValue: string) {
    this.searchInputValue = searchValue;
  }

  hovered: boolean = false;


  // displaying the qty of each filter option
  getAllTokensQty() {
    return this.tokens.length;
  }

  getTransferableTokensQty() {
    return 1;
    // return this.tokens.filter(token => token.type === "transferable").length;
  }

  getNonTransferableTokensQty() {
    return 1;
    // return this.tokens.filter(token => token.type === "non-transferable").length;
  }


  // checked radio button is all by default
  selectedRadioButton: string = "all";

  // filtering results when the radio button is changed
  onFilterSelectionChanged(data: string) {

    this.selectedRadioButton = data;
    console.log(this.selectedRadioButton);
    console.log('http://localhost/backend/alltokens.php?order=' + this.selectedRadioButton);
  }


}
