import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShownftComponent} from "./shownft/shownft.component";
import {HomeComponent} from "./home/home.component";
import {NftsComponent} from "./nfts/nfts.component";
import {EthchartComponent} from "./ethchart/ethchart.component";
import {ContactComponent} from "./contact/contact.component";
import {LoginComponent} from "./login/login.component";
import {Error404Component} from "./error404/error404.component";

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'nfts', component: NftsComponent, pathMatch: 'full' },
  {path: 'nft/:i' , component: ShownftComponent},
  { path: 'nft', component: ShownftComponent , pathMatch: 'full' },
  { path: 'ethchart', component: EthchartComponent, pathMatch: 'full' },
  { path: 'contact', component: ContactComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: Error404Component, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
