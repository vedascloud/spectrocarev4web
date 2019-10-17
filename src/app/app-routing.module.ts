import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminsigninComponent } from './components/adminsignin/adminsignin.component';
import { AdminsignupComponent } from './components/adminsignup/adminsignup.component';
import { MedicalpersonnelsignupComponent } from './components/medicalpersonnelsignup/medicalpersonnelsignup.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path:"adminsignin",component:AdminsigninComponent},
  {path:"",redirectTo:"adminsignin",pathMatch:"full" },
  {path:"adminsignup",component:AdminsignupComponent},
  {path:"medicalpersonnelsignup",component:MedicalpersonnelsignupComponent},
  {path:"home",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
