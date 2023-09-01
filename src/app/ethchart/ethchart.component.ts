import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Eth} from "../Interface/Eth";
import {apiURL} from "../../environment/environment";

@Component({
  selector: 'app-ethchart',
  templateUrl: './ethchart.component.html',
  styleUrls: ['./ethchart.component.scss']
})
export class EthchartComponent {

  eth ?:Eth[];

  constructor(private http :HttpClient) {}

  ngOnInit(){
this.getEthValues();
  }

  getEthValues():void{
    let url = `${apiURL}eth`;

    this.http.get<Eth[]>(url).subscribe(
      (data: Eth[])=>{
        this.eth = data;
      }
    )
  }
}
