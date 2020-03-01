import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  signInRes: any;
  signObj: any;
  userID: string;
  patients: any = [];
  patientData: any;
  loading: boolean;
  isViewPatient: boolean = true;
  isViewPhysicalRecord: boolean = true;
  patientProfileForm: FormGroup;
  updateFamilyRelationDataForm: FormGroup;
  bodyIndexDataForm: FormGroup;
  previewImg: any;
  patientFamilyHistory: any = [];
  patientImmunizationData: any = [];  
  patientPhysicalReocrdsData: any = [];
  patientMedicalReocrdsData:any = [];
  phy:any = [];
  isBodyIndex:boolean = true;
  closeResult: string;
  term:any;
  favoriteSeason: string;
  seasons: string[] = ['Normal', 'Abnormal', 'Not Examined'];
  physicalExamination: any =[];

  titleArray:any =
  {title:"Patient",
  subTitle:"",
img:"assets/images/ui/Icons/1x/admin center.png"};
  
  @ViewChild('fileInput', { static: true }) el: ElementRef;

  constructor(private modalService: NgbModal, private router: Router, private loginService: LoginService, private fb: FormBuilder, private cd: ChangeDetectorRef, private patientService: PatientService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    
    this.signInRes = localStorage.getItem("SignInRes");
    this.previewImg = "/assets/images/smile.jpg";
    if (this.signInRes) {
      this.signObj = JSON.parse(this.signInRes);
      this.userID = localStorage.getItem('userID');

      let getPatientsData = {
        "userID": this.userID,
        "category": "All",
        "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num,
        "token": this.signObj.access_token
      }
      this.loading = true;
      this.getPatientData(getPatientsData)
    }

    this.patientProfileForm = this.fb.group({

      patientID: ["", [Validators.required]],
      medical_record_id: ["", Validators.required],
      lastName: ["", Validators.required],
      firstName: ['', Validators.required],
      gender: ["", Validators.required],
      dob: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      address: ["", Validators.required],
      state: ["", Validators.required],
      city: ["", Validators.required],
      profilePic: [""],
    });

    this.patientProfileForm.disable();

    this.updateFamilyRelationDataForm = this.fb.group({
      hospital_reg_num:["",Validators.required],
      medical_personnel_id:["",Validators.required],
      patientID:["",Validators.required] ,
      medical_record_id: ["",Validators.required],
      family_history_record_id: ["",Validators.required],
      healthCondition : ["",Validators.required],
      relationship : ["",Validators.required],
      age : ["",Validators.required],
      moreInfo : ["",Validators.required]
    });

    this.bodyIndexDataForm = this.fb.group({
      height:[""],
      weight:[""],
      waistline:[""],
      bloodPressure:[""],
      bmi:[""]
    });

  }

  //Mat Snack Bar
  openSnackBar(message:string,action:string){
    this._snackBar.open(message,action,{duration:5000})
  }
  //Tab Change Event
  onTabChange(event) {
    console.log("event", event)
    // this.isViewPatient = true;
  }

  getPatientData(obj) {
    this.patientService.getPatientData(obj).subscribe(
      (res) => {
        console.log(res)
        if (res.response === 3) {
          this.loading = false;
          this.patients = res.patients;

        } else if (res.response === 0) {
          this.loading = false;
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

  openViewOne(patient) {
    this.isViewPatient = false;
    this.patientData = patient;
    console.log("Selected Patient User To View Data : ", patient);

    this.patientProfileForm.patchValue({
      patientID: patient.patientID,
      medical_record_id: patient.medical_record_id,
      lastName: patient.lastName,
      firstName: patient.firstName,
      gender: patient.gender,
      dob: patient.dob,
      phoneNumber: patient.phoneNumber.phoneNumber,
      address: patient.address,
      state: patient.state,
      city: patient.city
    });
    this.previewImg = "http://3.92.226.247:3000" + patient.profilePic;

    // this.openView()
  }

  openView() {
    this.isViewPatient = false;

  }
  closeView() {
    this.isViewPatient = true;
    this.ngOnInit();

  }

  openPhysicalExamTab(selectedpatientPhysicalReocrdsData){
    this.isViewPhysicalRecord = false;
    this.physicalExamination = selectedpatientPhysicalReocrdsData.physicalExamination
    //let havingData = selectedpatientPhysicalReocrdsData;
    console.log("It contains : ",this.physicalExamination);

    if(selectedpatientPhysicalReocrdsData.bodyIndex === undefined){
      this.bodyIndexDataForm.patchValue({
        height:"0",
        weight:"0",
        waistline:"0",
        bloodPressure:"0",
        bmi:"0"
      })
    }
    else{
      this.bodyIndexDataForm.patchValue({
        height:selectedpatientPhysicalReocrdsData.bodyIndex.height,
        weight:selectedpatientPhysicalReocrdsData.bodyIndex.weight,
        waistline:selectedpatientPhysicalReocrdsData.bodyIndex.waistline,
        bloodPressure:selectedpatientPhysicalReocrdsData.bodyIndex.bloodPressure,
        bmi:selectedpatientPhysicalReocrdsData.bodyIndex.bmi
      })
    }
   
    
  }

  closePhysicalExamTab(){
    this.isViewPhysicalRecord = true;
  }

  isBodyIndexOpen(){
    this.isBodyIndex = true;
  }
  isPhysicalExamOpen(){
    this.isBodyIndex = false;
  }

  //Image Upload
  fileProgress(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.patientProfileForm.get('profilePic').setValue(file);
        this.previewImg = reader.result
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.patientProfileForm.get('profilePic').setValue(null)
  }
  //Img Upload complete here
  //Signout Modal
  openSignOut(content1) {
    this.modalService.open(content1, { centered: true, size: "sm" })
  }
  SignOut() {
    console.log("SignOut Called")
    localStorage.clear()
    this.router.navigateByUrl('/administrator')
    this.modalService.dismissAll()
    //this.openSnackBar(resForCancelAppointment.message,"");
  }



  sendReqForFetchPatientData(event) {
    console.log("From : ", event.tab.textLabel)
    if(event.tab.textLabel === "Family History"){
      this.loading = true;
      this.fetchPatientFamilyHistory();

    }
    else if(event.tab.textLabel === "Immunization"){
      this.loading = true;
      this.fetchImmunizationRecord();
    }
    else if(event.tab.textLabel === "Physical Exam"){
      this.loading = true;
      this.fetchPatientPhysicalExamRecords();
    }
    else if(event.tab.textLabel === "Medical History"){
      this.loading = true;
      this.fetchPatientMedicalRecords();
    }
    else{

    }
    //alert("Hi From Fetch Family History Of the Patient...");
  
 
    
  }

  

  fetchPatientFamilyHistory() {
    console.log("Patien data : ", this.patientData);
    let reqData = {
      "hospital_reg_num": this.patientData.hospital_reg_num,
      "medical_personnel_id": this.patientData.medical_personnel_id,
      "patientID": this.patientData.patientID,
      "medical_record_id": this.patientData.medical_record_id
    }
    console.log("Req data to fetch p-family-data : ", reqData);
    //Service Call For Fetch Patient Family History
    this.patientService.fetchPatientFamilyHistory(reqData, this.signObj.access_token).subscribe(
      (resForPatientFamilyHistory) => {
        if (resForPatientFamilyHistory.response === 3) {
          console.log(" Res For Patient Family History :  ", resForPatientFamilyHistory.family_history_records);
          this.loading = false;
          this.patientFamilyHistory = resForPatientFamilyHistory.family_history_records;
          //alert(resAdminWithGenUserData.message);
        }
        else {
          this.patientFamilyHistory = [];
          console.log("no data fecthed...");
          this.loading = false;
          //this.loading= false;
          //alert(resAdminWithGenUserData.message);
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
      }
    );
  }

  fetchImmunizationRecord() {
    
   let reqData = {
      "hospital_reg_num": this.patientData.hospital_reg_num,
      "medical_personnel_id": this.patientData.medical_personnel_id,
      "patientID": this.patientData.patientID,
      "medical_record_id": this.patientData.medical_record_id
    }
    //Service Call For Fetch Immunizations Record Of the Patient
    this.patientService.fetchImmunizationRecord(reqData, this.signObj.access_token).subscribe(
      (resFetchImmunizationRecord) => {
        if (resFetchImmunizationRecord.response === 3) {
          console.log("From Fetch Immunization Data :",resFetchImmunizationRecord);
          this.loading = false;
          this.patientImmunizationData = resFetchImmunizationRecord.immunization_records;
        }
        else {
          this.patientImmunizationData = [];
          console.log("For Failure case of fetch Immunization record of the patient : ", resFetchImmunizationRecord.message);
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
      }
    );
  }

  //Call Fetch Patient Physical-Exam-History With Body-Index
  fetchPatientPhysicalExamRecords(){
    let reqData = {
      "hospital_reg_num": this.patientData.hospital_reg_num,
      "medical_personnel_id": this.patientData.medical_personnel_id,
      "patientID": this.patientData.patientID,
      "medical_record_id": this.patientData.medical_record_id
    }
    this.patientService.fetchPatientPhysicalExamRecordsData(reqData,this.signObj.access_token).subscribe(
      (resFromPatientPhysicalRecordsFetch)=>{
        if(resFromPatientPhysicalRecordsFetch.response === 3){
          this.loading = false;
          this.patientPhysicalReocrdsData = resFromPatientPhysicalRecordsFetch.physical_exam_records;
          this.phy = resFromPatientPhysicalRecordsFetch;
          
          console.log("the patient data : ",resFromPatientPhysicalRecordsFetch);
          
        }
        else{
          this.patientPhysicalReocrdsData = [];
          console.log("no data fecthed...");
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
      }
    )

  }

  fetchPatientMedicalRecords(){
    let reqData = {
      "hospital_reg_num": this.patientData.hospital_reg_num,
      "medical_personnel_id": this.patientData.medical_personnel_id,
      "patientID": this.patientData.patientID,
      "medical_record_id": this.patientData.medical_record_id
    }
    this.patientService.fetchPatientMedicalRecordsData(reqData,this.signObj.access_token).subscribe(
      (resFromPatientMedicalRecordsFetch)=>{
        if(resFromPatientMedicalRecordsFetch.response === 3){
          this.loading = false;
          this.patientMedicalReocrdsData = resFromPatientMedicalRecordsFetch.illnessRecords;
          
        }
        else{
          this.patientMedicalReocrdsData = [];
          console.log("no data fecthed...");
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
      }
    )
  }

  open(content,patientFamilyHistory) {
    //patientFamilyHistory = patientFamilyHistory
    this.updateFamilyRelationDataForm.patchValue({
      hospital_reg_num : patientFamilyHistory.hospital_reg_num,
      medical_personnel_id : patientFamilyHistory.medical_personnel_id,
      patientID : patientFamilyHistory.patientID,
      medical_record_id : patientFamilyHistory.medical_record_id,
      family_history_record_id : patientFamilyHistory.family_history_record_id,
      healthCondition : patientFamilyHistory.healthCondition,
      relationship : patientFamilyHistory.relationship,
      age : patientFamilyHistory.age,
      moreInfo : patientFamilyHistory.moreInfo
    });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',centered:true,size:'lg' }).result.then((result) => {
      alert("Hi");
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  updateRelationData(){
    
    let updateRelation = {
      "hospital_reg_num":this.updateFamilyRelationDataForm.value.hospital_reg_num,
      "medical_personnel_id":this.updateFamilyRelationDataForm.value.medical_personnel_id,
      "patientID": this.updateFamilyRelationDataForm.value.patientID,
      "medical_record_id": this.updateFamilyRelationDataForm.value.medical_record_id,
      "family_history_record_id": this.updateFamilyRelationDataForm.value.family_history_record_id,
      "healthCondition":this.updateFamilyRelationDataForm.value.healthCondition,
      "relationship":this.updateFamilyRelationDataForm.value.relationship,
      "age":this.updateFamilyRelationDataForm.value.age,
      "moreInfo":this.updateFamilyRelationDataForm.value.moreInfo
    }

    console.log("req data to update patient family history : ",updateRelation);
    
    //Service For Update Family  Patient
    this.patientService.updatePatientFamilyHistory(updateRelation,this.signObj.access_token).subscribe(
      (resFromUpdateRelation)=>{
        if(resFromUpdateRelation.response === 3){     
          this.fetchPatientFamilyHistory();
          //this.patientFamilyHistory = updateRelation;     
          this.modalService.dismissAll();
          this.ngOnInit();
          this.openSnackBar(resFromUpdateRelation.message,"");
         
        }
        else{
          console.log(resFromUpdateRelation.message);
          alert(resFromUpdateRelation.message);
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.loading = false;
          console.log("Client Side Error", err);

        } else {
          this.loading = false;
          console.log("Server Side", err)
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
