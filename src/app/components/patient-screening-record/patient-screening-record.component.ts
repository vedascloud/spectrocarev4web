import { Component, OnInit } from '@angular/core';
import { PatientProfileComponent } from '../patient-profile/patient-profile.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
interface SearchByValue {

  viewValue: string;
}
@Component({
  selector: 'app-patient-screening-record',
  templateUrl: './patient-screening-record.component.html',
  styleUrls: ['./patient-screening-record.component.css']
})
export class PatientScreeningRecordComponent implements OnInit {

  dateToShow: any;
  signInRes: any;
  signObj: any;
  userID: any;
  sub: any;
  id: string;
  patients: any = [];
  selectedPatient: any;
  SelectedPatient: any;
  loading: boolean;
  isLoading: boolean = false;
  patientAppointmentsData: any;
  patientScreeningRecordsData: any;
  previewImg: any;
  closeResult: string;
  fetchPatientScreeningRecordsObj: any;
  selected = 'All';
  searchByValue: SearchByValue[] = [
    { viewValue: 'All' }
  ];


  testResults: any = [
    {
      "testname": "Glucose",
      "results": "40(+)",
      "flag": "Abnormal",
      "units": "mg/dL",
      "reference": "<30"
    },
    {
      "testname": "Glucose",
      "results": "40(+)",
      "flag": "Abnormal",
      "units": "mg/dL",
      "reference": "<30"
    },
    {
      "testname": "Glucose",
      "results": "40(+)",
      "flag": "Abnormal",
      "units": "mg/dL",
      "reference": "<30"
    },
    {
      "testname": "Glucose",
      "results": "40(+)",
      "flag": "Abnormal",
      "units": "mg/dL",
      "reference": "<30"
    }
  ]

  constructor(private activatedRoute: ActivatedRoute, private patientProfile: PatientProfileComponent,
    private loginService: LoginService, private modalService: NgbModal, ) { }

  ngOnInit() {
    this.dateToShow = new Date().toLocaleDateString()
    //this.patientAppointmentsData = this.patientProfile.patientAppointmentsData;
    this.selectedPatient = this.patientProfile.selectedPatient;
    this.loading = true;
    console.log("selected patient data : ",this.selectedPatient);

    this.signInRes = localStorage.getItem("SignInRes");
    this.signObj = JSON.parse(this.signInRes);

    //this.previewImg = "../../../assets/images/ui/Icons/1x/profile-1.png";
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loginService.id = this.id;
      console.log("id from component : ", this.id);
      console.log("id from login service : ", this.loginService);


    })
    console.log("Selected Patient Data from screening record component : ", this.selectedPatient);

    this.signInRes = localStorage.getItem("SignInRes");
    if (this.signInRes) {
      this.signObj = JSON.parse(this.signInRes);
      this.userID = localStorage.getItem('userID');

      let medicalObj = {
        "userID": this.userID,
        "category": "All",
        "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num,
        "token": this.signObj.access_token
      }
     // this.getPatientData(medicalObj);
      this.fetchPatientScreeningRecordsMethod();
    }

    
  }

 fetchPatientScreeningRecordsMethod() {
    this.fetchPatientScreeningRecordsObj = {
      "patientID": this.selectedPatient.patientID,
      "medical_record_id": this.selectedPatient.medical_record_id,
      "byWhom": "admin",
      "byWhomID": this.signObj.hospitalAdmin.userID,
      "hospital_reg_num": this.selectedPatient.hospital_reg_num
    }
    console.log("Obj Data to fetch patient Screening Records : ", this.fetchPatientScreeningRecordsObj);
    this.loginService.getPatientScreeningData(this.fetchPatientScreeningRecordsObj, this.signObj.access_token).
      subscribe(
        (res) => {
          console.log("res from fetchPatientScreeningRecordsObj records  : ", res)
          if (res.response === 3) {
            this.loading = false;
            this.patientScreeningRecordsData = res.illnessScreeningRecords;
            let screeningRecordsArray: any[] = this.patientScreeningRecordsData;
            console.log("Number of screeningRecords : ", screeningRecordsArray.length);
            console.log("Res from Patient Screening Records Data : ", this.patientScreeningRecordsData);
          }
          else if (res.response === 0) {
            this.loading = false;
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.loading = false;
            console.log("Client Side Error")
          } else {
            this.loading = false;
            console.log(err)
          }
        })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openViewMethod(viewModel,selectedScreeningData) {
    this.modalService.open(viewModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openShareReportMethod(viewShareReportModel) {
    this.modalService.open(viewShareReportModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  showData(event) {

  }


}
