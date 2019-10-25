import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-adminsignup',
  templateUrl: './adminsignup.component.html',
  styleUrls: ['./adminsignup.component.css']
})
export class AdminsignupComponent implements OnInit {
  title:string = 'Administrator';
  isAdministrator:boolean = true;
  adminSignUpForm:FormGroup;
    constructor(private router:Router, private fb:FormBuilder,private loginService:LoginService ) { }
  
    ngOnInit() {
      this.adminSignUpForm=this.fb.group({
        hospitalInformation:this.fb.group({
          hospital_reg_num:['',Validators.required],
        hospitalName:['',Validators.required],
        emailID:['',Validators.required],
        address:['',Validators.required],
        city:['',Validators.required],
        state:['',Validators.required],
        country:['',Validators.required],
        postCode:[null,Validators.required],
        latitude:[null,Validators.required],
        longitude:[null,Validators.required],
        phoneNumber: this.fb.group({
          countryCode:['',Validators.required],
        phoneNumber:['',Validators.required],
        })
        }),
       hospitalAdmin:this.fb.group({
        userID:['',Validators.required],
        password:['',Validators.required],
        firstName:['',Validators.required],
        lastName:['',Validators.required],
        phoneNumber: this.fb.group({
          countryCode:['',Validators.required],
        phoneNumber:['',Validators.required],
        }),
        emailID:['',Validators.required],
        preferLanguage:['',Validators.required],
        
       
       }) 
      })
    }

    adminSignUp(){
      console.log(this.adminSignUpForm.value);
      this.loginService.adminRegister(this.adminSignUpForm.value).subscribe((posRes)=>{
        console.log("Pos",posRes)
        if(posRes.response === 3){
          alert(posRes.message)
          this.router.navigateByUrl('/adminsignin')
        }else{
          alert(posRes.message)
        }
      },(err)=>{
        console.log(err)
      })
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