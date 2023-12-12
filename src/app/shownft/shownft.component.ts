import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Nft} from "../_Interface/Nft";
import {apiURL} from "../../environment/environment";
import {ActivatedRoute} from "@angular/router";
import {StartupService} from "../_services/startUp/startup.service";

@Component({
  selector: 'app-shownft',
  templateUrl: './shownft.component.html',
  styleUrls: ['./shownft.component.scss']
})
export class ShownftComponent {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private startUpService : StartupService
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
    this.startUpService.setLoadingStatus(true);
    this.http.get<Nft>(url).subscribe(
      nft => {

        nft.image.url = "https://127.0.0.1:8000/uploads/nfts/" + nft.image.url;
        this.nft = nft;
        this.startUpService.setLoadingStatus(false);

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
