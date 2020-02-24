import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  title:string = 'Administrator';
isAdministrator:boolean = true;
adminForgotForm:FormGroup;
medicalForgotForm:FormGroup;
  constructor(private router:Router, private fb:FormBuilder,private loginService:LoginService) { }

  ngOnInit() {
    this.adminForgotForm =this.fb.group({
      "userID":["",[Validators.required,Validators.email]]
    })
    this.medicalForgotForm =this.fb.group({
      email:["",Validators.required]
    })
  }
  submitForm(){
    console.log(this.adminForgotForm.value)
    this.loginService.forgotPassword(this.adminForgotForm.value).subscribe((res)=>{
      console.log(res)
      if(res.response === 3){
        alert("Password reset link has been sent to your registered email ID");
        this.router.navigateByUrl('/administrator')
      }else{
        alert("Your Details didn't Match")
      }
    },(err)=>{
      console.log(err)
    })
  }
  medicalSubmit(){
    console.log(this.medicalForgotForm.value)
  }
  callMedicalPersonnel(){
    this.isAdministrator = false;
    this.title = 'Medical Personnel'
  }
  callAdministrator(){
    this.isAdministrator = true;
    this.title = 'Administrator'
  }
  signUp(){
    if(this.isAdministrator === true){
      this.router.navigateByUrl('/adminsignup');
    }else{
      this.router.navigateByUrl('/medicalpersonnelsignup')
    }
  }
  // forgot(){
    
  //     this.router.navigateByUrl('/forgot');
    
  // }
}
