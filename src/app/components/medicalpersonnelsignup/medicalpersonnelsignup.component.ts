import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-medicalpersonnelsignup',
  templateUrl: './medicalpersonnelsignup.component.html',
  styleUrls: ['./medicalpersonnelsignup.component.css']
})
export class MedicalpersonnelsignupComponent implements OnInit {
  title:string = 'Administrator';
  isAdministrator:boolean = true;
  adminSignUpForm:FormGroup;
  medicalSignUpForm:FormGroup;

  identitys = [
    {value: 'Doctor', viewValue: 'Doctor'},
    {value: 'Nurse', viewValue: 'Nurse'},
    {value: 'Practitioner', viewValue: 'Practitioner'}
  ];

  genders = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'}
  ];

  departments = [
    {value: 'Pharmacy', viewValue: 'Pharmacy'},
    {value: 'Admissions', viewValue: 'Admissions'},
    {value: 'Cardiology', viewValue: 'Cardiology'}
  ];

  countryCodes = [
    {value: '+91', viewValue: '+91'},
    {value: '+886', viewValue: '+886'},
    {value: '+60', viewValue: '+60'}
  ];

    constructor(private router:Router, private fb:FormBuilder,private loginService:LoginService ,private _snackBar: MatSnackBar) { }
  
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
        hospital_reg_num:['',Validators.required],
        department:['',Validators.required],
        checkBox:['',Validators.required],
        phoneNumber: this.fb.group({
          countryCode:['',[Validators.required]],
          phoneNumber:['',[Validators.required,Validators.minLength(10)]],
        })
      })
    }

      //Mat Snack Bar
  openSnackBar(message:string,action:string){
    this._snackBar.open(message,action,{duration:5000})
  }

  adminSignUp(){
    console.log(this.adminSignUpForm.value);
    
    this.loginService.adminRegister(this.adminSignUpForm.value).subscribe((posRes)=>{
      console.log("Pos",posRes)
      if(posRes.response === 3){
        this.openSnackBar(posRes.message,"");
        //alert(posRes.message)
        this.router.navigateByUrl('/administrator')
      }
      else if(posRes.response === 5){
        alert(posRes.message);
      }
      else{
        alert(posRes.message)
      }
    },(err)=>{
      console.log(err)
    })
  }

  signUp(){
    this.router.navigateByUrl('/medicalpersonnel')
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