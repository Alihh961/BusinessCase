import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.component.html',
  styleUrls: ['./nfts.component.scss']
})
export class NftsComponent implements OnInit {

  constructor (private titlePage: Title, private userService :UserService){}

  ngOnInit(): void {
    this.titlePage.setTitle("NFTs");
    console.log(this.userService.getUserInfo());
    console.log(this.userService.getLoggedUserStatus());


  }
}
