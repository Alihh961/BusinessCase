import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { BanniereHomePageComponent } from './banniere-home-page/banniere-home-page.component';
import { CookiesNotificationComponent } from './cookies-notification/cookies-notification.component';
import { Error404Component } from './error404/error404.component';
import { FilterComponent } from './filter/filter.component';
import { GalleryComponent } from './gallery/gallery.component';
import { backgroundColorDirective } from './CustomDirective/background.directive';
import { HighlightDirective } from './CustomDirective/highlight.directive';
import { SearchComponent } from './search/search.component';
import { NftsComponent } from './nfts/nfts.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PopularcreatorsComponent } from './popularcreators/popularcreators.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenstringDirective } from './CustomDirective/forbiddenstring.directive';

const appRoutes: Routes = [
    // { path: '' ,redirectTo: 'home' , pathMatch: 'full'},
    { path: '', component: HomeComponent},
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'nfts', component: NftsComponent, pathMatch: 'full' },
    { path: 'popularcreators', component: PopularcreatorsComponent, pathMatch: 'full' },
    { path: 'contact', component: ContactComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: '**', component: Error404Component, pathMatch: 'full' },
    
  ];

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
    PopularcreatorsComponent,
    FooterComponent,
    LoginComponent,
    ForbiddenstringDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }