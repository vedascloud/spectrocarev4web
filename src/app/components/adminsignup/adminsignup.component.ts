import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminsignup',
  templateUrl: './adminsignup.component.html',
  styleUrls: ['./adminsignup.component.css']
})
export class AdminsignupComponent implements OnInit {
  title:string = 'Administrator';
  isAdministrator:boolean = true;
    constructor() { }
  
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
  }