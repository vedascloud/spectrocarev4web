import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medicalpersonnelsignup',
  templateUrl: './medicalpersonnelsignup.component.html',
  styleUrls: ['./medicalpersonnelsignup.component.css']
})
export class MedicalpersonnelsignupComponent implements OnInit {
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