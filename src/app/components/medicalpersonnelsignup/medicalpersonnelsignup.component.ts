import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
@Component({
  selector: 'app-medicalpersonnelsignup',
  templateUrl: './medicalpersonnelsignup.component.html',
  styleUrls: ['./medicalpersonnelsignup.component.css']
})
export class MedicalpersonnelsignupComponent implements OnInit {
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedStates, CountryISO.UnitedKingdom, CountryISO.Taiwan, CountryISO.China, CountryISO.Malaysia];
  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  title: string = 'Administrator';
  isAdministrator: boolean = true;
  adminSignUpForm: FormGroup;
  medicalSignUpForm: FormGroup;
  previewImg: any;
  isButton: boolean = false;
  closeResult: string;
  identitys = [
    { value: 'Doctor', viewValue: 'Doctor' },
    { value: 'Nurse', viewValue: 'Nurse' },
    { value: 'Practitioner', viewValue: 'Practitioner' }
  ];

  genders = [
    { value: 'Male', viewValue: 'Male' },
    { value: 'Female', viewValue: 'Female' }
  ];

  departments = [
    { value: 'Pharmacy', viewValue: 'Pharmacy' },
    { value: 'Admissions', viewValue: 'Admissions' },
    { value: 'Cardiology', viewValue: 'Cardiology' }
  ];

  countryCodes = [
    { value: '+91', viewValue: '+91' },
    { value: '+886', viewValue: '+886' },
    { value: '+60', viewValue: '+60' }
  ];

  @ViewChild('fileInput', { static: true }) el: ElementRef;

  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService,
    private _snackBar: MatSnackBar, private cd: ChangeDetectorRef, private modalService: NgbModal,) { }

  ngOnInit() {
    this.previewImg = "../../../assets/images/ui/Icons/1x/profile-1.png";
    this.medicalSignUpForm = this.fb.group({
      userId: ['', Validators.required],
      identity: ['', Validators.required],
      gender: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      phCode: ['', Validators.required],
      number: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      rgNo: ['', Validators.required],
      hospital_reg_num: ['', Validators.required],
      department: ['', Validators.required],
      checkBox: ['', Validators.required],
      phoneNumber: this.fb.group({
        countryCode: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      },
        // {
        //   validators: this.passwordConfirming
        // }
      ),
      checkPhone: ['', [Validators.required]],
      profilePic: [""]
    })
  }
  // passwordConfirming(c: AbstractControl) { //: { invalid: boolean }
  //   if (c.get('password').value !== c.get('confirmPassword').value) {
  //     c.get('confirmPassword').setErrors({ NoPassswordMatch: true });
  //     //return { invalid: true };
  //   }
  // }
  //Image Upload
  fileProgress(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.medicalSignUpForm.get('profilePic').setValue(file);
        this.previewImg = reader.result
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.medicalSignUpForm.get('profilePic').setValue(null)
  }
  //Img Upload complete here

  //Mat Snack Bar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'
    })
  }
  openSnackBar1(message: string, action: string) {
    this._snackBar.open(message, action, {
      panelClass: ['red-snackbar'],
      duration: 5000,
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'
    })
  }

  adminSignUp() {
    console.log(this.medicalSignUpForm.value);

    this.loginService.adminRegister(this.medicalSignUpForm.value).subscribe((posRes) => {
      console.log("Pos", posRes)
      if (posRes.response === 3) {
        this.openSnackBar(posRes.message, "");
        //alert(posRes.message)
        this.router.navigateByUrl('/administrator')
      }
      else if (posRes.response === 5) {
        alert(posRes.message);
      }
      else {
        alert(posRes.message)
      }
    }, (err) => {
      console.log(err)
    })
  }

  signUp() {
    this.router.navigateByUrl('/medicalpersonnel')
  }
  medicalSignUp() {
    console.log(this.medicalSignUpForm.value);
  }
  callMedicalPersonnel() {
    this.isAdministrator = false;
    this.title = 'Medical Personnel'
  }
  callAdministrator() {
    this.isAdministrator = true;
    this.title = 'Administrator'
  }
  openTerms(content) {
    this.isButton = false;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl', backdrop: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openPrivacyPolicy(content1) {
    this.isButton = false;
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl', backdrop: false }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}