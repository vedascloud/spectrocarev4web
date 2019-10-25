import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminsignin',
  templateUrl: './adminsignin.component.html',
  styleUrls: ['./adminsignin.component.css']
})
export class AdminsigninComponent implements OnInit {
  title:string = 'Administrator';
isAdministrator:boolean = true;
adminSignINForm:FormGroup;
medicalSignINForm:FormGroup;
  constructor(private router:Router, private fb:FormBuilder) { }

  ngOnInit() {
    this.adminSignINForm =this.fb.group({
      email:["",Validators.required],
      password:['',Validators.required]
    })
    this.medicalSignINForm =this.fb.group({
      email:["",Validators.required],
      password:['',Validators.required]
    })
  }
  submitForm(){
    console.log(this.adminSignINForm.value)
  }
  medicalSubmit(){
    console.log(this.medicalSignINForm.value)
  }
  callMedicalPersonnel(){
    this.isAdministrator = false;
    this.title = 'Medical Personnel'
  }
  callAdministrator(){
    this.isAdministrator = true;
    this.title = 'Administrator';
  }
  signUp(){
    if(this.isAdministrator === true){
      this.router.navigateByUrl('/adminsignup');
    }else{
      this.router.navigateByUrl('/medicalpersonnelsignup')
    }
  }
  forgot(){
    
      this.router.navigateByUrl('/forgot');
    
  }
}
