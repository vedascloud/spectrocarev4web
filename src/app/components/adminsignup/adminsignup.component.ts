import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-adminsignup',
  templateUrl: './adminsignup.component.html',
  styleUrls: ['./adminsignup.component.css']
})
export class AdminsignupComponent implements OnInit {
  title: string = 'Administrator';
  isAdministrator: boolean = true;
  adminSignUpForm: FormGroup;
  previewImg: any;

  gender = [
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

  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService, private _snackBar: MatSnackBar, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.previewImg = "../../../assets/images/ui/Icons/1x/profile-1.png";
    this.adminSignUpForm = this.fb.group({
      hospitalInformation: this.fb.group({
        hospital_reg_num: ['', [Validators.required]],
        hospitalName: ['', [Validators.required]],
        emailID: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        postCode: ['', [Validators.required]],
        latitude: ['0.0'],
        longitude: ['0.0'],
        phoneNumber: this.fb.group({
          countryCode: ['', [Validators.required]],
          phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        })
      }),
      hospitalAdmin: this.fb.group({
        userID: ['', [Validators.required]],//,Validators.minLength(4),Validators.maxLength(8)
        gender: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNumber: this.fb.group({
          countryCode: ['', [Validators.required]],
          phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        }),
        emailID: ['', [Validators.required, Validators.email]],
        preferLanguage: ['English', [Validators.required]],
        department: ['', [Validators.required]],

      }, {
        validators: this.passwordConfirming
      }
      ),

      profilePic: [""],
    })
    //this.getCurrentLocation()
  }

  passwordConfirming(c: AbstractControl) { //: { invalid: boolean }

    if (c.get('password').value !== c.get('confirmPassword').value) {
      c.get('confirmPassword').setErrors({ NoPassswordMatch: true });
      //return { invalid: true };
    }

  }
  checkPasswords(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
      return { invalid: true };
    }
  }
  //Image Upload
  fileProgress(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.adminSignUpForm.get('profilePic').setValue(file);
        this.previewImg = reader.result
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.adminSignUpForm.get('profilePic').setValue(null)
  }
  //Img Upload complete here

  //For getting current location
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Position", position);

        this.adminSignUpForm.patchValue({
          hospitalInformation: {
            latitude: "" + position.coords.latitude.toFixed(4),
            longitude: "" + position.coords.longitude.toFixed(4),
          }
        })
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

   //Mat Snack Bar
   openSnackBar(message:string,action:string){
    this._snackBar.open(message,action,{duration:5000, panelClass: ['theme-snackbar']})
  }

  //Mat Snack Bar
  openSnackBar1(message:string,action:string){
    this._snackBar.open(message,action,{duration:5000, panelClass: ['red-snackbar']})
  }

  adminSignUp() {
    console.log(this.adminSignUpForm.value);

    let payLoad = this.adminSignUpForm.value
   delete payLoad.hospitalAdmin.gender;
  delete payLoad.profilePic;
    delete payLoad.hospitalAdmin.confirmPassword;
    console.log("payload", payLoad)
    
    let formData = new FormData()
    formData.append("hospitalData",JSON.stringify(payLoad));
    formData.append("profilePic",this.adminSignUpForm.get('profilePic').value)

    console.log("Form Data : "+formData);
    this.loginService.adminRegister(formData).subscribe((posRes) => {
      console.log("Pos", posRes)
      if (posRes.response === 3) {
        this.openSnackBar(posRes.message, "");
        //alert(posRes.message)
        this.router.navigateByUrl('/administrator')
      }
      else if (posRes.response === 5) {
        this.openSnackBar1(posRes.message,"");
        //alert(posRes.message);
      }
      else {
        this.openSnackBar1(posRes.message,"");
        //alert(posRes.message)
      }
    }, 
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.openSnackBar1("Please try another time...","");
        console.log("Client Side Error")
      } else {
        this.openSnackBar1("Please try another time...","");
        console.log(err)
      }
    }
    )
  }

  signUp() {
    this.router.navigateByUrl('/administrator')
  }
  termsandconditions() {
    this.router.navigateByUrl('/termsandconditions');
  }
  privacypolicy() {
    this.router.navigateByUrl('/privacypolicy');
  }
  callMedicalPersonnel() {
    this.isAdministrator = false;
    this.title = 'Medical Personnel'
  }
  callAdministrator() {
    this.isAdministrator = true;
    this.title = 'Administrator'
  }
}