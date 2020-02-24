import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-searchpatient',
  templateUrl: './searchpatient.component.html',
  styleUrls: ['./searchpatient.component.css']
})
export class SearchpatientComponent implements OnInit {
  signInRes: any;
  signObj: any;
  userID: string;
  medicalPersonnels: any = []
  filteredMedicalPersonnels:any=[]
  patients: any = []
  filteredPatients:any = []
  isAllSelected:boolean = true;
  loading:boolean;
  constructor(private loginService: LoginService,private modalService: NgbModal) { }

  ngOnInit() {
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
      this.loading = true;
      this.getPatientData(medicalObj)
      this.loginService.getMedicalPatientData(medicalObj).subscribe(
        (res) => {
          console.log(res)
          if (res.response === 3) {
            this.medicalPersonnels = res.medicalPersonnels
            this.filteredMedicalPersonnels = res.medicalPersonnels
            // this.medicalPersonnels.forEach(val=>{
            //   val.isSelected= false;
            // })
          }
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client Side Error")
          } else {
            console.log(err)
          }
        })
    }
  }
  getPatientData(obj) {
    this.loginService.getPatientData(obj).subscribe(
      (res) => {
        console.log(res)
        if (res.response === 3) {
          this.loading= false;
          this.patients = res.patients
          this.filteredPatients = res.patients
        }else if(res.response === 0){
          this.loading = false;
          this.filteredPatients = res.patients
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.loading = false;
          console.log("Client Side Error")
        } else {
          this.loading = false;
          console.log(err)
        }
      })
  }
  getPData(data){
    console.log("PDATA",data)
  }
  search(term: string) {
    if(!term) {
      this.filteredPatients = this.patients;
    } else {
      this.filteredPatients = this.patients.filter(x => 
         x.firstName.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  }
  searchMedical(term: string) {
    if(!term) {
      this.filteredMedicalPersonnels = this.medicalPersonnels;
    } else {
      this.filteredMedicalPersonnels = this.medicalPersonnels.filter(x => 
         x.firstName.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  }
  showAllPatients(){
    this.loading = true;
    this.isAllSelected = true;
    this.medicalPersonnels.forEach(val=>{
      if(val.medical_personnel_id === 'All' ){
        val.isSelected = true;
      }else{
        val.isSelected = false;
      }
    })
    let medicalObj = {
      "userID": this.userID,
      "category": 'All',
      "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num,
      "token": this.signObj.access_token
    }
    this.getPatientData(medicalObj)
  }
  showDctrPatients(data) {
    this.loading = true;
    this.isAllSelected = false;
    this.medicalPersonnels.forEach(val=>{
      if(val.medical_personnel_id === data.medical_personnel_id ){
        val.isSelected = true;
      }else{
        val.isSelected = false;
      }
    })
    
    let medicalObj = {
      "userID": this.userID,
      "category": data.medical_personnel_id,
      "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num,
      "token": this.signObj.access_token
    }
    this.getPatientData(medicalObj)
  }
  //Delete Modal
  openDeleteModal(content1) {
    this.modalService.open(content1, { centered: true, size: "sm" })
    }
    deleteProject(clientObj) {
      console.log("PatientInformTion",clientObj)
      let delObj = {
      "medical_personnel_id":clientObj.medical_personnel_id,
      "hospital_reg_num":clientObj.hospital_reg_num,
      "patientID":clientObj.patientID,
      "token": this.signObj.access_token
      }

      this.loginService.deletePatientInfo(delObj).subscribe((res)=>{
        console.log(res);
        if(res.response === 3){
          this.modalService.dismissAll();
          this.showDctrPatients(clientObj)
        }
        else{
          this.modalService.dismissAll();
          alert(res.message);
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.loading = false;
          console.log("Client Side Error")
        } else {
          this.loading = false;
          console.log(err)
        }
      }
      )
    
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
}
