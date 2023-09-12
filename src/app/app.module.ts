import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ContactComponent} from './contact/contact.component';
import {BanniereHomePageComponent} from './banniere-home-page/banniere-home-page.component';
import {CookiesNotificationComponent} from './cookies-notification/cookies-notification.component';
import {Error404Component} from './error404/error404.component';
import {FilterComponent} from './filter/filter.component';
import {GalleryComponent} from './gallery/gallery.component';
import {SearchComponent} from './search/search.component';
import {NftsComponent} from './nfts/nfts.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {CookieService} from 'ngx-cookie-service';
import {Console, DateFormatPipe} from './pipes/date-transform.pipe';
import {ShownftComponent} from './shownft/shownft.component';
import {EthchartComponent} from './ethchart/ethchart.component';
import {HttpinterceptorInterceptor} from "./services/httpinterceptor/httpinterceptor.interceptor";
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from "./guard/auth.guard";

const appRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    BanniereHomePageComponent,
    CookiesNotificationComponent,
    Error404Component,
    FilterComponent,
    GalleryComponent,
    SearchComponent,
    NftsComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DateFormatPipe,
    Console,
    ShownftComponent,
    EthchartComponent,
    DashboardComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      useHash: false,

    })
  ],
  providers: [
    CookieService,
    AuthGuard
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpinterceptorInterceptor,
    //   multi: true,
    // },
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
