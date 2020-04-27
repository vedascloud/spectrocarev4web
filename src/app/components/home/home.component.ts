import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedStates, CountryISO.UnitedKingdom, CountryISO.Taiwan, CountryISO.China, CountryISO.Malaysia];
  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  homeForm: FormGroup;
  previewImg: any;
  signObj: any;
  userID: string;
  checkAdministrator: string;
  isAdminSystmMngr: boolean;
  disableUpdateBtn: boolean = false;
  closeResult: string;
  isLoading: boolean = false;
  titleArray: any =
    {
      title: "Admin Center",
      subTitle: "Profile",
      img: "assets/images/ui/Icons/1x/admin center.png"
    };
  // signInRes:any = localStorage.getItem("SignInRes");
  loading: boolean;

  //show date
  n = new Date();
  y = this.n.getFullYear();
  m = this.n.getMonth() + 1;
  d = this.n.getDate();
  presentDate = this.m + "/" + this.d + "/" + this.y;

  countryCodes = [
    { value: '+91', viewValue: '+91' },
    { value: '+886', viewValue: '+886' },
    { value: '+60', viewValue: '+60' }
  ];

  @ViewChild('fileInput', { static: true }) el: ElementRef;
  @ViewChild('autoFocusTest', { static: false }) nativeEl: ElementRef;

  constructor(private router: Router, private fb: FormBuilder, private cd: ChangeDetectorRef, private modalService: NgbModal,
    private loginService: LoginService, private _snackBar: MatSnackBar, private patientService: PatientService) { }

  ngOnInit() {
    this.patientService.isEditable.next(true)
    this.checkAdministrator = localStorage.getItem("AdministratorSystemManager");
    console.log("admin stm mgr : ", this.checkAdministrator);

    var signInRes = localStorage.getItem("SignInRes");
    if (signInRes) {
      this.signObj = JSON.parse(signInRes);
      this.userID = localStorage.getItem('userID');
      console.log(this.signObj);
    }
    //  console.log("Admin Data : ",JSON.parse(this.adminData));
    this.previewImg = "assets/images/The-Health-Clinic.png";
    this.homeForm = this.fb.group({
      userID: [''],
      hospitalName: ['', Validators.required],
      hospital_reg_num: ['', Validators.required],
      emailID: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      city: [""],
      state: [""],
      country: [""],
      postCode: [""],
      latitude: [''],
      longitude: [''],
      checkPhone: ['', [Validators.required]],
      phoneNumber: this.fb.group({
        countryCode: [''],
        phoneNumber: [''],
      })
    })

    this.homeForm.disable()
    this.getCurrentLocation()
    this.loading = true;
    this.autoAddAdminData(this.signObj);
    this.loading = false;

    //Giving Access Controls to AdministratorSystemManager & AdministratorGeneral
    if (this.checkAdministrator === "3") {
      this.isAdminSystmMngr = true;
      //this.homeForm.enable()
    }
    else {
      this.isAdminSystmMngr = false;
      this.homeForm.disable()
    }

  }

  //Mat Snack Bar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 })
  }

  home() {
    console.log(this.homeForm.value);
  }

  //Image Upload
  fileProgress(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.homeForm.get('hospitalImg').setValue(file);
        this.previewImg = reader.result
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.homeForm.get('hospitalImg').setValue(null)
  }

  //Show Admin Data
  autoAddAdminData(hospitalData) {

    // console.log("Admin Data : ",JSON.parse(adminData));
    this.homeForm.patchValue({
      userID: hospitalData.hospitalAdmin.userID,
      hospitalName: hospitalData.hospitalInformation.hospitalName,
      checkPhone: this.signObj.hospitalInformation.phoneNumber.phoneNumber,
      phoneNumber: {
        phoneNumber: hospitalData.hospitalInformation.phoneNumber.phoneNumber,
        countryCode: hospitalData.hospitalInformation.phoneNumber.countryCode
      },
      hospital_reg_num: hospitalData.hospitalInformation.hospital_reg_num,
      emailID: hospitalData.hospitalInformation.emailID,
      address: hospitalData.hospitalInformation.address,
      password: hospitalData.hospitalAdmin.password,
      city: hospitalData.hospitalInformation.city,
      state: hospitalData.hospitalInformation.state,
      country: hospitalData.hospitalInformation.country,
      postCode: hospitalData.hospitalInformation.postCode,
      latitude: "" + hospitalData.hospitalInformation.loc[0],
      longitude: "" + hospitalData.hospitalInformation.loc[1]
    })
  }

  //For getting current location
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Position", position);
        this.homeForm.patchValue({
          latitude: "" + position.coords.latitude.toFixed(4),
          longitude: "" + position.coords.longitude.toFixed(4)

        })
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  //Update Admin / Hospital Info
  updateAdminInfo() {
    this.isLoading = true;

    let countryCode1 = this.homeForm.get(["checkPhone"]).value;
    console.log("CountryDetails 1 :", countryCode1);
    var str1 = countryCode1.number;
    str1 = str1.replace(/ +/g, "");
    this.homeForm.patchValue({

      phoneNumber: {
        countryCode: countryCode1.dialCode,
        phoneNumber: str1
      }

    })
    let payLoad = this.homeForm.value
    // let formData = new FormData();
    delete payLoad.checkPhone;
    console.log("req for hospital update data  : ", payLoad);

    this.loginService.updateAdmin(payLoad, this.signObj.access_token).subscribe((updateReq) => {
      console.log("req for update admin data : ", updateReq);
      if (updateReq.response === 3) {
        this.isLoading = false;

        this.signObj.hospitalAdmin.userID = this.homeForm.value.userID;
        this.signObj.hospitalInformation.hospitalName = this.homeForm.value.hospitalName;
        this.signObj.hospitalInformation.hospital_reg_num = this.homeForm.value.hospital_reg_num;
        this.signObj.hospitalInformation.emailID = this.homeForm.value.emailID;
        this.signObj.hospitalInformation.address = this.homeForm.value.address;
        this.signObj.hospitalInformation.city = this.homeForm.value.city;
        this.signObj.hospitalInformation.state = this.homeForm.value.state;
        this.signObj.hospitalInformation.country = this.homeForm.value.country;
        this.signObj.hospitalInformation.postCode = this.homeForm.value.postCode;
        this.signObj.hospitalInformation.loc[0] = this.homeForm.value.latitude;
        this.signObj.hospitalInformation.loc[1] = this.homeForm.value.longitude;
        this.signObj.hospitalInformation.phoneNumber.phoneNumber = str1;
        this.signObj.hospitalInformation.phoneNumber.countryCode = countryCode1.dialCode;

        console.log("After update the hospital signObj data is : ", this.signObj);

        localStorage.setItem("SignInRes", JSON.stringify(this.signObj));

        this.ngOnInit()

        this.openSnackBar(updateReq.message, "");
        //alert(updateReq.message)
      }
      else {
        this.isLoading = false;
        this.openSnackBar(updateReq.message, "");
        //alert(updateReq.message)
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.isLoading = false;
          console.log("Client Side Error", err);

        } else {
          this.isLoading = false;
          console.log("Server Side", err)
        }
      }
    );
  }

  openUpdate() {
    if (this.disableUpdateBtn === false) {
      this.disableUpdateBtn = true;
      this.homeForm.enable();
      this.nativeEl.nativeElement.focus()
      this.patientService.isEditable.next(false)
      //this.homeForm.value.hospitalName.value.focus();
    }
    else {
      this.disableUpdateBtn = false;
      this.homeForm.disable();
      this.patientService.isEditable.next(true)
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      //this.changePasswordForm.reset();
    });
  }
  //Signout Modal
  openSignOut(content1) {
    this.modalService.open(content1, { centered: true, size: "sm" })
  }
  SignOut() {
    console.log("SignOut Called")
    localStorage.clear()
    this.router.navigateByUrl('/administrator')
    this.modalService.dismissAll()
    //this.openSnackBar(resForCancelAppointment.message,"");
  }

}
