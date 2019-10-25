import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  constructor(private router:Router, private fb:FormBuilder) { }

  ngOnInit() {
    this.adminForgotForm =this.fb.group({
      email:["",Validators.required]
    })
    this.medicalForgotForm =this.fb.group({
      email:["",Validators.required]
    })
  }
  submitForm(){
    console.log(this.adminForgotForm.value)
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
