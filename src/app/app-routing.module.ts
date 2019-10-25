import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminsigninComponent } from './components/adminsignin/adminsignin.component';
import { AdminsignupComponent } from './components/adminsignup/adminsignup.component';
import { MedicalpersonnelsignupComponent } from './components/medicalpersonnelsignup/medicalpersonnelsignup.component';
import { HomeComponent } from './components/home/home.component';
import { ManageuserComponent } from './components/manageuser/manageuser.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { TermsandconditionsComponent } from './components/termsandconditions/termsandconditions.component';
import { PrivacypolicyComponent } from './components/privacypolicy/privacypolicy.component';
import { ReportComponent } from './components/report/report.component';
import { BillandpaymentComponent } from './components/billandpayment/billandpayment.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';



const routes: Routes = [
  {path:"adminsignin",component:AdminsigninComponent},
  {path:"adminsignup",component:AdminsignupComponent},
  {path:"medicalpersonnelsignup",component:MedicalpersonnelsignupComponent},
  {path:"home",component:HomeComponent},
  {path:"manageuser",component:ManageuserComponent},
  {path:"forgot",component:ForgotpasswordComponent},
  {path:"termsandconditions",component:TermsandconditionsComponent},
  {path:"privacypolicy",component:PrivacypolicyComponent},
  {path:"report",component:ReportComponent},
  {path:"billandpayment",component:BillandpaymentComponent},
  {path:"changepassword",component:ChangepasswordComponent},
  {path:"",redirectTo:"adminsignin",pathMatch:"full" },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
