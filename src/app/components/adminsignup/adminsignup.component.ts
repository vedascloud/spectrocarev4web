import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-adminsignup',
  templateUrl: './adminsignup.component.html',
  styleUrls: ['./adminsignup.component.css']
})
export class AdminsignupComponent implements OnInit {
  title: string = 'Administrator';
  isAdministrator: boolean = true;
  adminSignUpForm: FormGroup;

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

  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.adminSignUpForm = this.fb.group({
      hospitalInformation: this.fb.group({
        hospital_reg_num: ['', [Validators.required, Validators.minLength(3)]],
        hospitalName: ['', [Validators.required, Validators.minLength(3)]],
        emailID: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        country: ['', [Validators.required]],
        postCode: [null, [Validators.required]],
        latitude: [''],
        longitude: [''],
        phoneNumber: this.fb.group({
          countryCode: ['', [Validators.required]],
          phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        })
      }),
      hospitalAdmin: this.fb.group({
        userID: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        phoneNumber: this.fb.group({
          countryCode: ['', [Validators.required]],
          phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
        }),
        emailID: ['', [Validators.required, Validators.email]],
        preferLanguage: ['English', [Validators.required]],
        department: ['', [Validators.required]]
      }),
    })
    this.getCurrentLocation()
  }


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
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 })
  }

  adminSignUp() {
    console.log(this.adminSignUpForm.value);

    this.loginService.adminRegister(this.adminSignUpForm.value).subscribe((posRes) => {
      console.log("Pos", posRes)
      if (posRes.response === 3) {
        this.openSnackBar(posRes.message, "");
        //alert(posRes.message)
        this.router.navigateByUrl('/administrator')
      }
      else if (posRes.response === 5) {
        this.openSnackBar(posRes.message, "");
        //alert(posRes.message);
      }
      else {
        this.openSnackBar(posRes.message, "");
        //alert(posRes.message)
      }
    }, (err) => {
      console.log(err)
    })
  }

  signUp() {
    this.router.navigateByUrl('/administrator')
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