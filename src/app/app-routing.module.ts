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
import { AdmincenterComponent } from './components/admincenter/admincenter.component';
import { PatientComponent } from './components/patient/patient.component';
import { AddmedrecordComponent } from './components/addmedrecord/addmedrecord.component';
import { SearchpatientComponent } from './components/searchpatient/searchpatient.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { ViewPatientMedicalRecordComponent } from './components/view-patient-medical-record/view-patient-medical-record.component';
import { GeneralInformationComponent } from './components/general-information/general-information.component';
import { BodyIndexComponent } from './components/body-index/body-index.component';
import { PhysicalExamHisoryComponent } from './components/physical-exam-hisory/physical-exam-hisory.component';
import { FamilyHisoryComponent } from './components/family-hisory/family-hisory.component';
import { MedicalHistoryComponent } from './components/medical-history/medical-history.component';
import { VaccinationComponent } from './components/vaccination/vaccination.component';
import { PatientAppointmentRecordComponent } from './components/patient-appointment-record/patient-appointment-record.component';
import { PatientScreeningRecordComponent } from './components/patient-screening-record/patient-screening-record.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { ShowPatientProfileComponent } from './components/show-patient-profile/show-patient-profile.component';
import { ViewPatientAppointmentSummaryComponent } from './components/view-patient-appointment-summary/view-patient-appointment-summary.component';
import { PatientProfileeComponent } from './components/patient-profilee/patient-profilee.component';
import { MedicalPersonnelProfileComponent } from './components/medical-personnel-profile/medical-personnel-profile.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { ManageMedicalPersonsComponent } from './components/manage-medical-persons/manage-medical-persons.component';
import { AdminGeneralUserProfileComponent } from './components/admin-general-user-profile/admin-general-user-profile.component';
import { PatientProfileFormComponent } from './components/patient-profile-form/patient-profile-form.component';
import { PatientMedicalRecordsComponent } from './components/patient-medical-records/patient-medical-records.component';
import { AdminAppointmentComponent } from './components/admin-appointment/admin-appointment.component';
import { UpcomingAppointmentComponent } from './components/upcoming-appointment/upcoming-appointment.component';
import { PastAppointmentComponent } from './components/past-appointment/past-appointment.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { AppointmentCalendarComponent } from './components/appointment-calendar/appointment-calendar.component';
import { HeaderOneComponent } from './components/header-one/header-one.component';
import { AdministartorComponent } from './components/administartor/administartor.component';
import { MedicalPersonnelComponent } from './components/medical-personnel/medical-personnel.component';
import { PatientModuleComponent } from './components/patient-module/patient-module.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllMedicalRecordComponent } from './components/all-medical-record/all-medical-record.component';
import { HeaderComponent } from './components/header/header.component';



const routes: Routes = [
  {path:"adminsignin",component:AdminsigninComponent},
  {path:"adminsignup",component:AdminsignupComponent},
  {path:"administrator",component:AdministartorComponent},
  {path:"medicalpersonnel",component:MedicalPersonnelComponent},
  {path:"patientmodule",component:PatientModuleComponent},

  {path:"medicalpersonnelsignup",component:MedicalpersonnelsignupComponent},
  
  {path:"forgot",component:ForgotpasswordComponent},
  {path:"termsandconditions",component:TermsandconditionsComponent},
  {path:"privacypolicy",component:PrivacypolicyComponent},
  {path:"changepassword",component:ChangepasswordComponent},
  {path:"admincenter", component:AdmincenterComponent,
  children:[
    {path:'dashboard',component:DashboardComponent},
    {path:'home',component:HomeComponent},
    {path:"adminprofile",component:AdminProfileComponent},
    {path:"manageuser",component:ManageuserComponent},
    {path:"admingeneraluserprofile/:id",component:AdminGeneralUserProfileComponent},
    {path:"medicalpersonnelprofile/:id",component:MedicalPersonnelProfileComponent},
    {path:"managemedicalpersons",component:ManageMedicalPersonsComponent},
    {path:"billandpayment",component:BillandpaymentComponent},
    {path:"report",component:ReportComponent},
    {path:"patient",component:PatientComponent},
    {path:"allmedicalrecord",component:AllMedicalRecordComponent},
    {path:"upcomingappointment",component:UpcomingAppointmentComponent},
    {path:"pastappointment",component:PastAppointmentComponent},
    {path:"bookappointment",component:BookAppointmentComponent},
    {path:"appointmentcalendar",component:AppointmentCalendarComponent},
    {path:"",redirectTo:"home",pathMatch:"full" },
  ]},
  // {path:"patient",component:PatientComponent,
  // children:[
  //   {path:"searchpatient",component:SearchpatientComponent},
  //   {path:"patientprofilee/:id",component:PatientProfileeComponent,
  //     children:[
  //       {path:"patientprofileform",component:PatientProfileFormComponent},
  //       {path:"patientmedicalrecords",component:PatientMedicalRecordsComponent},
  //       {path:"patientappointmentrecord",component:PatientAppointmentRecordComponent},
  //       {path:"",redirectTo:"patientprofileform",pathMatch:"full"}
  //     ]
  //   },
  //   {path:"addmedrecord",component:AddmedrecordComponent},
  //   {path:"patientappointmentrecord",component:PatientAppointmentRecordComponent},
  //   {path:'viewpatientmedicalrecord',component:ViewPatientMedicalRecordComponent,
  //   children:[
  //     {path:"patientprofile",component:PatientProfileComponent,
  //     children:[
  //       {path:"generalinformation",component:GeneralInformationComponent},
  //       {path:"addmedicalrecord",component:AddmedrecordComponent,
  //       children:[
  //         {path:"bodyindex",component:BodyIndexComponent},
  //         {path:"physicalexamhisory",component:PhysicalExamHisoryComponent},
  //         {path:"familyhisory",component:FamilyHisoryComponent},
  //         {path:"medicalhistory",component:MedicalHistoryComponent},
  //         {path:"vaccination",component:VaccinationComponent},
  //         {path:"",redirectTo:"bodyindex",pathMatch:"full"}    
  //       ]
  //       },
  //       {path:"",redirectTo:"generalinformation",pathMatch:"full"}
  //     ]
  //     },
  //     //{path:"showpatientprofile",component:ShowPatientProfileComponent},
      
  //     //{path:"viewpatientappointmentsummary",component:ViewPatientAppointmentSummaryComponent},
  //     //{path:"patientscreeningrecord",component:PatientScreeningRecordComponent},
  //     {path:"",redirectTo:"patientprofile",pathMatch:"full"}
  //   ]
  //   },
  //   {path:"",redirectTo:"searchpatient",pathMatch:"full"}
  // ]
  // },

  // {path:"adminappointment",component:AdminAppointmentComponent,
  //   children:[
  //     {path:"upcomingappointment",component:UpcomingAppointmentComponent},
  //     {path:"pastappointment",component:PastAppointmentComponent},
  //     {path:"bookappointment",component:BookAppointmentComponent},
  //     {path:"appointmentcalendar",component:AppointmentCalendarComponent},
  //     {path:"",redirectTo:"upcomingappointment",pathMatch:"full"}
  //   ]
  // },
  {path:"main",component:MainHomeComponent},
  
  {path:"",redirectTo:"administrator",pathMatch:"full" },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
