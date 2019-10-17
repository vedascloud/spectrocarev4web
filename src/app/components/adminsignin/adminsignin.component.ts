import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminsignin',
  templateUrl: './adminsignin.component.html',
  styleUrls: ['./adminsignin.component.css']
})
export class AdminsigninComponent implements OnInit {
  title:string = 'Administrator';
isAdministrator:boolean = true;
  constructor(private router:Router) { }

  ngOnInit() {
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
}
