import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { MatSnackBar } from '@angular/material';

import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedStates, CountryISO.UnitedKingdom, CountryISO.Taiwan, CountryISO.China, CountryISO.Malaysia];
  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  signInRes: any;
  signObj: any;
  userID: string;
  patients: any = [];
  patientData: any;
  loading: boolean;
  isViewPatient: boolean = true;
  isViewPhysicalRecord: boolean = true;
  patientProfileForm: FormGroup;
  updateFamilyRelationDataForm: FormGroup;
  bodyIndexDataForm: FormGroup;
  previewImg: any;
  patientFamilyHistory: any = [];
  patientImmunizationData: any = [];  
  patientPhysicalReocrdsData: any = [];
  patientMedicalReocrdsData:any = [];
  phy:any = [];
  isBodyIndex:boolean = true;
  closeResult: string;
  term:any;
  favoriteSeason: string;
  seasons: string[] = ['Normal', 'Abnormal', 'Not Examined'];
  physicalExamination: any =[];
  listSize:any;

  titleArray:any =
  {title:"Patient",
  subTitle:"",
img:"assets/images/ui/Icons/patient-medical-module/Group 2494.png"};
  
  @ViewChild('fileInput', { static: true }) el: ElementRef;

  constructor(private modalService: NgbModal, private router: Router, private loginService: LoginService, private fb: FormBuilder,
     private cd: ChangeDetectorRef, private patientService: PatientService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    
    this.signInRes = localStorage.getItem("SignInRes");
    this.previewImg = "/assets/images/smile.jpg";
    if (this.signInRes) {
      this.signObj = JSON.parse(this.signInRes);
      this.userID = localStorage.getItem('userID');

      let getPatientsData = {
        "userID": this.userID,
        "category": "All",
        "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num,
        "token": this.signObj.access_token
      }
      this.loading = true;
      this.getPatientData(getPatientsData)
    }
  }

  //Mat Snack Bar
  openSnackBar(message:string,action:string){
    this._snackBar.open(message,action,{duration:5000})
  }
  //Tab Change Event
  onTabChange(event) {
    console.log("event", event)
    // this.isViewPatient = true;
  }

  getPatientData(obj) {
    this.patientService.getPatientData(obj).subscribe(
      (res) => {
        console.log(res)
        if (res.response === 3) {
          this.loading = false;
          this.patients = res.patients;
          let count:any [] = this.patients;
          this.listSize = count.length;
          console.log("Num Of Patients : ",this.listSize);
          

        } else if (res.response === 0) {
          this.loading = false;
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.loading = false;
          console.log("Client Side Error")
        } else {
          this.loading = false;
          console.log(err)
        }
      })
  }

}
