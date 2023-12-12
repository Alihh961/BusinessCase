import {Component} from '@angular/core';
import {UserService} from "../_services/user/user.service";
import {CookieService} from "../_services/cookie/cookie.service";
import {Nft} from "../_Interface/Nft";
import {NftService} from "../_services/nft/nft.service";
import {uploadsApiUrl} from "../../environment/environment";
import Swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private nftService: NftService
  ) {
  }


  nfts: Nft[] = [];


  ngOnInit() {
    this.getUserNfts();
  }

  getUserNfts() {
    const token = this.cookieService.getToken();

    this.nftService.getNftsOfUser(token).subscribe(
      (response: Nft[]) => {
        response.forEach(nft => {
          nft.image.url = `${uploadsApiUrl}${nft.image.url}`;

          this.nfts = response;
        })
      },
      (error: any) => {
        console.log(error);
      }
    )


  }

  deleteNft(event: Event) {

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        const htmlElement = event.target as HTMLElement;
        const nftId = htmlElement.getAttribute("data-nft-id");
        if (nftId) {
          this.nftService.deleteNftOfUser(+nftId).subscribe(
            response => {
              Swal.fire({
                "icon": 'success',
                'text': 'Deleted with success'
              }).then(()=>{
                window.location.reload();

              })

            },
            error => {
              console.log(error);
              Swal.fire({
                "icon": "error",
                "text": 'An error was occurred'
              })
            }
          )
        }


      }
    })


  }


}
