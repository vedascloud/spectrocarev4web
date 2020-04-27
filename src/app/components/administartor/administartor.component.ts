import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-administartor',
  templateUrl: './administartor.component.html',
  styleUrls: ['./administartor.component.css']
})
export class AdministartorComponent implements OnInit {

  adminSignINForm: FormGroup;
  password: string = "password";
  isPassword: boolean = true;
  isLoading: boolean = false;
  mySubscription:any;
  constructor(private router: Router, private fb: FormBuilder, private loginService: LoginService,private _snackBar: MatSnackBar) { }

  ngOnInit() {    
    this.adminSignINForm = this.fb.group({
      "userID": ['', [Validators.required]],
      "password": ['', [Validators.required, Validators.minLength(8)]]
    })
    this.adminSignINForm.markAsTouched()
  }

  //Mat Snack Bar
  openSnackBar(message:string,action:string){
    this._snackBar.open(message,action,{duration:5000, panelClass: ['theme-snackbar']})
  }

  //Mat Snack Bar
  openSnackBar1(message:string,action:string){
    this._snackBar.open(message,action,{duration:5000, panelClass: ['red-snackbar']})
  }
   // validation error messages to display on web pages
   validationMessageErrors = {
    'userID': {
      'required': "Email / UserID is required",
      //'email': "Enter a valid email / UserID"
    },
    'password': {
      'required': "Password is required",
      'minlength': "Password should contain atleast 8 letters"
    },
  }

  //To store the Error Messages
  validationErrors = {
    'userID': "",
    'password': "",
  }

  validationForm(group: FormGroup = this.adminSignINForm) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.validationErrors[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)) {
        const message = this.validationMessageErrors[key];
        for (const errorKey in abstractControl.errors) {
          this.validationErrors[key] += message[errorKey] + '';
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.validationForm(abstractControl);
      }
    })
  }

  submitForm() {
    this.isLoading = true;
    console.log("Admin SignIn Req Data : ",this.adminSignINForm.value)
  
    this.loginService.adminLogin(this.adminSignINForm.value).subscribe((res) => {
      console.log("SignIn Res", res)
      if (res.response === 3) {
        this.isLoading = false;
        localStorage.setItem("userID", this.adminSignINForm.value.userID);
        localStorage.setItem("SignInRes", JSON.stringify(res));
        this.router.navigateByUrl('/admincenter/dashboard');
        this.openSnackBar(res.message,"");
        if(res.hospitalAdmin.identity === "Administrator System Manager"){
          localStorage.setItem("AdministratorSystemManager","3");
        }
        else{
          localStorage.setItem("AdministratorSystemManager","0");
          
        }

      } 
      else if(res.response === 0){
        this.isLoading = false;
        this.openSnackBar1(res.message,"");
        //this.bg_clr ="red_clr"
        //alert("No account associated with this user ID");
      }
      else {
        this.isLoading = false;
        this.openSnackBar1(res.message,"");
        //this.bg_clr ="red_clr"
        //alert("Your Details didn't Match")
      }
    }, 
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.isLoading = false;
        console.log("Client Side Error")
      } else {
        this.isLoading = false;
        console.log(err)
      }
    }
    )
  }

  signUp() {   
      this.router.navigateByUrl("/adminsignup");    
  }

  forgot() {
    this.router.navigateByUrl('/forgot');
  }

  showPassword() {
    if (this.isPassword === true) {
      this.password = "text";
      this.isPassword = false;
    } else {
      this.password = "password"
      this.isPassword = true;
    }
  }


}
