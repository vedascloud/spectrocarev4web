import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-patient-medical-records',
  templateUrl: './patient-medical-records.component.html',
  styleUrls: ['./patient-medical-records.component.css']
})
export class PatientMedicalRecordsComponent implements OnInit {
  signInRes:any;
  signObj:any;
  id:string;
  pMedPersonID:string;
  token:string;

  constructor(private loginService:LoginService) { }

  ngOnInit() {

    //get All Patients
    this.signInRes = localStorage.getItem("SignInRes");
    if (this.signInRes) {
      this.signObj = JSON.parse(this.signInRes);
      this.token = this.signObj.access_token;
      //this.userID = localStorage.getItem('userID');

      let pMedReqData = {
        "medical_personnel_id": this.pMedPersonID,
        "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num,
        "patientID": this.id
      }
      this.getPatientMedicalRecords(pMedReqData)
    }
   
  }

  getPatientMedicalRecords(obj) {
    this.loginService.getPatientMedicalRecordsData(obj,this.token).subscribe(
      (getPmedRecordsRes) => {
        console.log("res for get-patient-med-records : ",getPmedRecordsRes)
        if (getPmedRecordsRes.response === 3) 
        {
          console.log("The Patient Having Med Reocds : ",getPmedRecordsRes.medical_records);
        }
        else
        {
          
          alert(getPmedRecordsRes.message)
        }
      }, 
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client Side Error")
        } else {
          console.log(err)
        }
      })
  }

}
