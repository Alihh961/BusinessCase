import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShownftComponent} from "./shownft/shownft.component";

const routes: Routes = [
  {path: 'nft/:i' , component: ShownftComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
