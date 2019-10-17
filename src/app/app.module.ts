import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminsigninComponent } from './components/adminsignin/adminsignin.component';
import { AdminsignupComponent } from './components/adminsignup/adminsignup.component';
import { MedicalpersonnelsignupComponent } from './components/medicalpersonnelsignup/medicalpersonnelsignup.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminsigninComponent,
    AdminsignupComponent,
    MedicalpersonnelsignupComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
