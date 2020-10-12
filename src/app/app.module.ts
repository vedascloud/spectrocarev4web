import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChartsModule } from 'ng2-charts';
import { NgxIntlTelInputModule } from 'projects/ngx-intl-tel-input/src/lib/ngx-intl-tel-input.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminsigninComponent } from './components/adminsignin/adminsignin.component';
import { AdminsignupComponent } from './components/adminsignup/adminsignup.component';
import { MedicalpersonnelsignupComponent } from './components/medicalpersonnelsignup/medicalpersonnelsignup.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ManageuserComponent } from './components/manageuser/manageuser.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ReportComponent } from './components/report/report.component';
import { BillandpaymentComponent } from './components/billandpayment/billandpayment.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';
import { AdmincenterComponent } from './components/admincenter/admincenter.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientAppointmentRecordComponent } from './components/patient-appointment-record/patient-appointment-record.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { PatientProfileeComponent } from './components/patient-profilee/patient-profilee.component';
import { MedicalPersonnelProfileComponent } from './components/medical-personnel-profile/medical-personnel-profile.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { ManageMedicalPersonsComponent } from './components/manage-medical-persons/manage-medical-persons.component';
import { AdminGeneralUserProfileComponent } from './components/admin-general-user-profile/admin-general-user-profile.component';
import { PatientMedicalRecordsComponent } from './components/patient-medical-records/patient-medical-records.component';
import { UpcomingAppointmentComponent } from './components/upcoming-appointment/upcoming-appointment.component';
import { PastAppointmentComponent } from './components/past-appointment/past-appointment.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { AppointmentCalendarComponent } from './components/appointment-calendar/appointment-calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MatCheckboxModule, MatSelectModule, MatSidenav, MatIconModule, MatMenuModule, MatButtonToggleModule, MatRadioModule, MatFormFieldModule, MatAutocompleteModule } from '@angular/material';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderOneComponent } from './components/header-one/header-one.component';
import { AdministartorComponent } from './components/administartor/administartor.component';
import { MedicalPersonnelComponent } from './components/medical-personnel/medical-personnel.component';
import { PatientModuleComponent } from './components/patient-module/patient-module.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllMedicalRecordComponent } from './components/all-medical-record/all-medical-record.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { PatientScreeningRecordComponent } from './components/patient-screening-record/patient-screening-record.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { PaymentTransactionsComponent } from './components/payment-transactions/payment-transactions.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HospitalDepartmentsComponent } from './components/hospital-departments/hospital-departments.component';
import { HospitalRolesComponent } from './components/hospital-roles/hospital-roles.component';
import { HospitalFeesComponent } from './components/hospital-fees/hospital-fees.component';
import { PatientResetPasswordComponent } from './components/patient-reset-password/patient-reset-password.component';
import { MaterialDialogComponent } from './components/material-dialog/material-dialog.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AdminResetPasswordComponent } from './components/admin-reset-password/admin-reset-password.component';
import { MedicapersonnelResetPasswordComponent } from './components/medicapersonnel-reset-password/medicapersonnel-reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminsigninComponent,
    AdminsignupComponent,
    MedicalpersonnelsignupComponent,
    HeaderComponent,
    HomeComponent,
    ManageuserComponent,
    ForgotpasswordComponent,
    ReportComponent,
    BillandpaymentComponent,
    ChangepasswordComponent,
    AdmincenterComponent,
    PatientComponent,
    PatientAppointmentRecordComponent,
    PatientProfileComponent,
    PatientProfileeComponent,
    MedicalPersonnelProfileComponent,
    AdminProfileComponent,
    ManageMedicalPersonsComponent,
    AdminGeneralUserProfileComponent,
    PatientMedicalRecordsComponent,
    UpcomingAppointmentComponent,
    PastAppointmentComponent,
    BookAppointmentComponent,
    AppointmentCalendarComponent,
    HeaderOneComponent,
    AdministartorComponent,
    MedicalPersonnelComponent,
    PatientModuleComponent,
    DashboardComponent,
    AllMedicalRecordComponent,
    InvoicesComponent,
    PatientScreeningRecordComponent,
    AppointmentListComponent,
    PaymentTransactionsComponent,
    SettingsComponent,
    HospitalDepartmentsComponent,
    HospitalRolesComponent,
    HospitalFeesComponent,
    PatientResetPasswordComponent,
    MaterialDialogComponent,
    TermsAndConditionsComponent,
    PrivacyPolicyComponent,
    AdminResetPasswordComponent,
    MedicapersonnelResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    NgxIntlTelInputModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    AmazingTimePickerModule,
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
