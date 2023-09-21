import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShownftComponent} from "./shownft/shownft.component";
import {HomeComponent} from "./home/home.component";
import {NftsComponent} from "./nfts/nfts.component";
import {EthchartComponent} from "./ethchart/ethchart.component";
import {ContactComponent} from "./contact/contact.component";
import {LoginComponent} from "./login/login.component";
import {Error404Component} from "./error404/error404.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "./_guard/auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {path: 'nfts', component: NftsComponent, pathMatch: 'full',canActivate: [AuthGuard]},
  {path: 'nft', component: ShownftComponent, pathMatch: 'full',canActivate: [AuthGuard]},
  {path: 'ethchart', component: EthchartComponent, pathMatch: 'full',canActivate: [AuthGuard]},
  {path: 'contact', component: ContactComponent, pathMatch: 'full',canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, pathMatch: 'full',canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, pathMatch: 'full' ,canActivate: [AuthGuard]},
  {path: '**', component: Error404Component, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
