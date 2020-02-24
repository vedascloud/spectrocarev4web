import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminsigninComponent } from './components/adminsignin/adminsignin.component';
import { AdminsignupComponent } from './components/adminsignup/adminsignup.component';
import { MedicalpersonnelsignupComponent } from './components/medicalpersonnelsignup/medicalpersonnelsignup.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ManageuserComponent } from './components/manageuser/manageuser.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { TermsandconditionsComponent } from './components/termsandconditions/termsandconditions.component';
import { PrivacypolicyComponent } from './components/privacypolicy/privacypolicy.component';
import { ReportComponent } from './components/report/report.component';
import { BillandpaymentComponent } from './components/billandpayment/billandpayment.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdmincenterComponent } from './components/admincenter/admincenter.component';
import { PatientComponent } from './components/patient/patient.component';
import { SearchpatientComponent } from './components/searchpatient/searchpatient.component';
import { AddmedrecordComponent } from './components/addmedrecord/addmedrecord.component';
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
import { AddmedicalrecordComponent } from './components/addmedicalrecord/addmedicalrecord.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule, MatCheckboxModule, MatSelectModule, MatSidenav, MatIconModule, MatMenuModule, MatButtonToggleModule, MatRadioModule} from '@angular/material';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import {MatTabsModule} from '@angular/material/tabs';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderOneComponent } from './components/header-one/header-one.component';
import { AdministartorComponent } from './components/administartor/administartor.component';
import { MedicalPersonnelComponent } from './components/medical-personnel/medical-personnel.component';
import { PatientModuleComponent } from './components/patient-module/patient-module.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllMedicalRecordComponent } from './components/all-medical-record/all-medical-record.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [
    AppComponent,
    AdminsigninComponent,
    AdminsignupComponent,
    MedicalpersonnelsignupComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    ManageuserComponent,
    ForgotpasswordComponent,
    TermsandconditionsComponent,
    PrivacypolicyComponent,
    ReportComponent,
    BillandpaymentComponent,
    ChangepasswordComponent,
    FooterComponent,
    AdmincenterComponent,
    PatientComponent,
    SearchpatientComponent,
    AddmedrecordComponent,
    MainHomeComponent,
    ViewPatientMedicalRecordComponent,
    GeneralInformationComponent,
    BodyIndexComponent,
    PhysicalExamHisoryComponent,
    FamilyHisoryComponent,
    MedicalHistoryComponent,
    VaccinationComponent,
    PatientAppointmentRecordComponent,
    PatientScreeningRecordComponent,
    PatientProfileComponent,
    AddmedicalrecordComponent,
    ShowPatientProfileComponent,
    ViewPatientAppointmentSummaryComponent,
    PatientProfileeComponent,
    MedicalPersonnelProfileComponent,
    AdminProfileComponent,
    ManageMedicalPersonsComponent,
    AdminGeneralUserProfileComponent,
    PatientProfileFormComponent,
    PatientMedicalRecordsComponent,
    AdminAppointmentComponent,
    UpcomingAppointmentComponent,
    PastAppointmentComponent,
    BookAppointmentComponent,
    AppointmentCalendarComponent,
    HeaderOneComponent,
    AdministartorComponent,
    MedicalPersonnelComponent,
    PatientModuleComponent,
    DashboardComponent,
    AllMedicalRecordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    AmazingTimePickerModule ,
    ChartsModule,
    Ng2SearchPipeModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
      fullScreenBackdrop: true
      }),
    BrowserAnimationsModule
    
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
