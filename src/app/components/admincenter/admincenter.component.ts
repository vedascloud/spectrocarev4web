import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admincenter',
  templateUrl: './admincenter.component.html',
  styleUrls: ['./admincenter.component.css']
})
export class AdmincenterComponent implements OnInit {

  events: string[] = [];
  opened: boolean;
  listInlist: boolean = false;
  listInPatient: boolean = false;
  listInAppointment: boolean = false;

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

  checkAdministrator:string;
  isAdminSystmMngr:boolean;

  constructor() { }

  ngOnInit() {
    this.checkAdministrator = localStorage.getItem("AdministratorSystemManager");

     //Giving Access Controls to AdministratorSystemManager & AdministratorGeneral
     if(this.checkAdministrator === "3"){
      this.isAdminSystmMngr = true; 
      //this.homeForm.enable()
    }
    else{
      this.isAdminSystmMngr = false;
      //this.homeForm.disable()
    }
  }

  openSubList(){
    this.listInlist = !this.listInlist;
    this.closePatientList();
    this.closeAppointmentList();
  }

  closeSubList(){
    this.listInlist = false;
    this.listInPatient = false;
    this.listInAppointment = false;
  }

  openPatientList(){
    this.listInPatient = !this.listInPatient;
    this.listInlist = false;
    this.listInAppointment = false;
  }
  closePatientList(){
    this.listInPatient = false;
  }

  openAppointmentList(){
    this.listInAppointment = !this.listInAppointment;
    this.listInlist = false;
    this.listInPatient = false;
    
  }
  closeAppointmentList(){
    this.listInAppointment = false;
  }

}
