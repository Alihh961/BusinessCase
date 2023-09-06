import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Nft} from "../Interface/Nft";
import {apiURL} from "../../environment/environment";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-shownft',
  templateUrl: './shownft.component.html',
  styleUrls: ['./shownft.component.scss']
})
export class ShownftComponent {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
  }

  nft ?: Nft;
  nftId ?: string;

  ngOnInit() {
    this.getNftId();
    this.getANft();

  }

  getANft(): void {
    let url = `${apiURL}nft?i=${this.nftId}`;
    this.http.get<Nft>(url).subscribe(
      nft => {

        nft.image.url = "assets/imgs/nfts/" + nft.image.url;
        this.nft = nft;
      }
    );
  }

  getNftId() {

    this.route.queryParams.subscribe(
      params => {

        this.nftId = params["i"];
      }
    )
  }

}
