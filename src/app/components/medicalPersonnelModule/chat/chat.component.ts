import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MedicalPersonnelAppointmentsComponent } from '../medical-personnel-appointments/medical-personnel-appointments.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  baseURL: string = "http://34.231.177.197:3000";
  patient: any;
  isValue: any;
  viewGeneralInfo: boolean = false;
  viewPatientInfo: boolean = false;
  viewFiles: boolean = false;
  viewChat: boolean = false;
  constructor(private dialogRef: MatDialog, private refData: MatDialogRef<MedicalPersonnelAppointmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log("the patient Data is : ", this.data);
    this.patient = this.data;
  }
  openGeneralInfo() {
    this.isValue = 1;
    this.viewGeneralInfo = true;
    this.viewPatientInfo = false;
    this.viewFiles = false;
    this.viewChat = false;
  }
  openPatientInfo() {
    this.isValue = 2;
    this.viewGeneralInfo = false;
    this.viewPatientInfo = true;
    this.viewFiles = false;
    this.viewChat = false;
  }
  openFile() {
    this.isValue = 3;
    this.viewGeneralInfo = false;
    this.viewPatientInfo = false;
    this.viewFiles = true;
    this.viewChat = false;
  }
  openChat() {
    this.isValue = 4;
    this.viewGeneralInfo = false;
    this.viewPatientInfo = false;
    this.viewFiles = false;
    this.viewChat = true;
  }
  closeModel() {
    this.refData.close();

  }


}
