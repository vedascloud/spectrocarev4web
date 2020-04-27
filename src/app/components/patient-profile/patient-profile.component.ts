import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  signInRes: any;
  signObj: any;
  userID: any;
  sub: any;
  id: string;
  patients: any = [];
  selectedPatient: any;
  SelectedPatient: any;
  fetchPatientAppointmentsObj: any;
  patientAppointmentsData: any;
  titleArray: any =
    {
      title: "Patient",
      subTitle: "",
      img: "assets/images/ui/Icons/patient-medical-module/Group 2494.png"
    };
  patientProfileForm: FormGroup;
  uploadedPatProfilePic: any;
  loading: boolean;

  isViewPatientGeneralInfo: boolean = true;
  isViewPatientMedicalRecords: boolean = true;
  isViewPatientAppointmentRecord: boolean = true;
  isViewPatientScreeningRecords: boolean = true;

  previewImg: any;
  @ViewChild('fileInput', { static: true }) el: ElementRef;
  constructor(private router: Router, private cd: ChangeDetectorRef, private loginService: LoginService,
    private fb: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;

    this.signInRes = localStorage.getItem("SignInRes");
    this.signObj = JSON.parse(this.signInRes);

    this.previewImg = "../../../assets/images/ui/Icons/1x/profile-1.png";
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.loginService.id = this.id;
      console.log("id from component : ", this.id);
      console.log("id from login service : ", this.loginService);


    })
    console.log("Selected Patient Data : ", this.selectedPatient);

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
      this.getPatientData(medicalObj)
    }
    this.patientProfileForm = this.fb.group({
      profilePic: [""]
    });

    this.callPatientGeneralInfo();
    this.fetchPatientAppointments();
    this.uploadImg();
  }

  getPatientData(obj) {
    this.loginService.getPatientData(obj).subscribe(
      (res) => {
        console.log("res from rou", res)
        if (res.response === 3) {
          this.loading = false;

          this.patients = res.patients

          let index = -1
          index = this.patients.findIndex(val => {

            return val.patientID == this.id
          })
          if (index != -1) {
            this.selectedPatient = this.patients[index]
            this.SelectedPatient = this.selectedPatient;
            console.log("selected patient from patient medical module : ", this.selectedPatient);
            console.log("SelectedPatient : ", this.SelectedPatient);

            this.previewImg = "http://3.92.226.247:3000" + this.selectedPatient.profilePic;

            // this.autoAddFields(this.selectedPatient)
          }

        }
        else if (res.response === 0) {
          this.loading = false;
          alert(res.message)
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

  //Fetch Patient APPOINTMENTS Records
  fetchPatientAppointments() {
    this.fetchPatientAppointmentsObj = {
      "patientID": this.id,
      "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num
    }
    console.log("Obj Data to fetch patient Appointments Records : ", this.fetchPatientAppointmentsObj);
    this.loginService.getPatientAppointmentsData(this.fetchPatientAppointmentsObj, this.signObj.access_token).
      subscribe(
        (res) => {
          console.log("res from fetch patient Appointmets records  : ", res)
          if (res.response === 3) {

            this.loading = false;
            this.patientAppointmentsData = res.appointments;
            let appointmentsArray: any[] = this.patientAppointmentsData;
            console.log("Number of appointment : ", appointmentsArray.length);

            console.log("Res from Patient Appointments Records Data : ", this.patientAppointmentsData);
            // for(let i = 0; i <= appointmentsArray.length; i++){
            //   if(appointmentsArray[i].appointmentDate !== ""){
            //     let allDates = appointmentsArray[i];
            //     console.log("appointment dates : ",allDates);              
            //   }
            //   else if(appointmentsArray[i].appointmentDate === "undefined"){
            //     console.log("Unvalid date : ");

            //   }
            // }
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

  uploadImg() {
    this.uploadedPatProfilePic = this.patientProfileForm.get('profilePic').value
    console.log("uploaded img : ",this.uploadedPatProfilePic);
    
  }
  callPatientGeneralInfo() {
    // this.router.navigateByUrl('/admincenter/patientgeneralinfo');
    this.isViewPatientGeneralInfo = false;
    this.isViewPatientMedicalRecords = true;
    this.isViewPatientAppointmentRecord = true;
    this.isViewPatientScreeningRecords = true;
  }

  callPatientMedicalReocrds() {
    //this.router.navigateByUrl('/admincenter/patientmedicalrecords');
    this.isViewPatientGeneralInfo = true;
    this.isViewPatientMedicalRecords = false;
    this.isViewPatientAppointmentRecord = true;
    this.isViewPatientScreeningRecords = true;
  }

  callPatientAppointmentRecords() {
    //this.router.navigateByUrl('/admincenter/patientappointmentrecords');
    this.isViewPatientGeneralInfo = true;
    this.isViewPatientMedicalRecords = true;
    this.isViewPatientAppointmentRecord = false;
    this.isViewPatientScreeningRecords = true;
  }

  callPatientScreeningRecord() {
    //this.router.navigateByUrl('/admincenter/patientscreeningrecord');
    this.isViewPatientGeneralInfo = true;
    this.isViewPatientMedicalRecords = true;
    this.isViewPatientAppointmentRecord = true;
    this.isViewPatientScreeningRecords = false;
  }


}
