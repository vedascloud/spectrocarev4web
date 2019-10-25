import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicalpersonnelsignup',
  templateUrl: './medicalpersonnelsignup.component.html',
  styleUrls: ['./medicalpersonnelsignup.component.css']
})
export class MedicalpersonnelsignupComponent implements OnInit {
  title:string = 'Administrator';
  isAdministrator:boolean = true;
  medicalSignUpForm:FormGroup;
    constructor(private router:Router, private fb:FormBuilder) { }
  
    ngOnInit() {
      this.medicalSignUpForm=this.fb.group({
        userId:['',Validators.required],
        identity:['',Validators.required],
        gender:['',Validators.required],
        lastName:['',Validators.required],
        firstName:['',Validators.required],
        email:['',Validators.required],
        phCode:['',Validators.required],
        number:['',Validators.required],
        password:['',Validators.required],
        confirmPassword:['',Validators.required],
        rgNo:['',Validators.required],
        department:['',Validators.required],
        checkBox:['',Validators.required]
      })
    }

    medicalSignUp(){
      console.log(this.medicalSignUpForm.value);
    }
    callMedicalPersonnel(){
      this.isAdministrator = false;
      this.title = 'Medical Personnel'
    }
    callAdministrator(){
      this.isAdministrator = true;
      this.title = 'Administrator'
    }
  }