import { Component, OnInit, ChangeDetectorRef,ElementRef, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder,FormArray } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-patient-profile-form',
  templateUrl: './patient-profile-form.component.html',
  styleUrls: ['./patient-profile-form.component.css']
})
export class PatientProfileFormComponent implements OnInit {

  patientProfileForm:FormGroup;
  signInRes:any;
  signObj:any;
  userID:any;
  loading:boolean;
  patients:any= [];
  sub:any;
  id:string;
  pMedPersonID:any;
  selectedPatient:any;
  previewImg:any;

  @ViewChild('fileInput', { static: true }) el: ElementRef;

  constructor(private fb:FormBuilder, private loginService:LoginService,private activatedRoute:ActivatedRoute, private cd:ChangeDetectorRef) { }

  ngOnInit() {

    //this.pMedPersonID = localStorage.setItem("patientMedPersID",this.selectedPatient.medical_personnel_id);

    this.previewImg = "/assets/images/smile.jpg";
    this.id = this.loginService.id
    this.patientProfileForm = this.fb.group({
      address:[""],
      age:[""],
      emailID:[""],
      firstName:[""],
      lastName:[""],
      country:[""],
      gender:[""],
      hospital_reg_num:[""],
      patientID:[""],
      medical_record_id:[""],
      medical_personnel_id:[""],
      postalCode:[""],
      profilePic:[""],
      state:[""],
      //loc:[""],
      //loc:this.fb.array([]),
      // phoneNumber: this.fb.group({
      //   countryCode:[''],
      //   phoneNumber:[''],
      // })
      phoneNumber:[""],
      countryCode:[""],
      latitude:[''],
      longitude:[''],

      // phoneNumber: this.fb.group({
      //   countryCode:[''],
      //   phoneNumber:[''],
      // })

    });

    this.getCurrentLocation();

    //get All Patients
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

  }

  get locArray(){
    return <FormArray> this.patientProfileForm.get('loc')
  }
    getPatientData(obj) {
      this.loginService.getPatientData(obj).subscribe(
        (res) => {
          console.log("res from rou",res)
          if (res.response === 3) 
          {
            this.patients = res.patients
          
            let index= -1
            index = this.patients.findIndex(val=>{
              
              return val.patientID == this.id
            })
            if(index != -1)
            {
              this.selectedPatient = this.patients[index]
              console.log("selected pat : ",this.selectedPatient);
              
              this.autoAddFields(this.selectedPatient)
            }
            
          }
          else if(res.response === 0)
          {
            this.loading = false;
            alert(res.message)
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
  
    autoAddFields(patient){
      this.patientProfileForm.patchValue({
        patientID:patient.patientID,
        firstName:patient.firstName,
        lastName:patient.lastName,
        gender:patient.gender,
        phoneNumber:patient.phoneNumber.phoneNumber,
        countryCode:patient.phoneNumber.countryCode,
        // phoneNumber:{
        //   phoneNumber:""+patient.phoneNumber.phoneNumber,
        //   countryCode:""+patient.phoneNumber.countryCode
        // },
        address:patient.address,
        hospital_reg_num:patient.hospital_reg_num,
        state:patient.state,
        emailID:patient.emailID,
        age:patient.age,
        postalCode:patient.postalCode,
        medical_record_id:patient.medical_record_id,
        medical_personnel_id:patient.medical_personnel_id,
        country:patient.country,
        latitude:""+patient.loc[0],
        longitude:""+patient.loc[1]
        //loc:patient.loc
      })
      this.previewImg = "http://3.92.226.247:3000"+patient.profilePic
      // for(let i:number = 0; i>=patient.loc.length; i++){
      //   this.locArray.push(patient.loc[0])
      // }
      console.log("Patient Full Details",this.patientProfileForm.value)
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
  
    //
    
    //
  
    //For getting current location
    getCurrentLocation(){
      if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
      console.log("Position",position);
      
      this.patientProfileForm.patchValue({
        latitude:"" + position.coords.latitude.toFixed(4),
        longitude:"" + position.coords.longitude.toFixed(4)
      
      })
      });
      } else {
      alert("Geolocation is not supported by this browser.");
      }
      }
  
    //Update Patient Data
    updatePatientInfo(){
      console.log("data sending : ",this.patientProfileForm.value);
      let formData = new FormData();
      formData.append("patientID",this.patientProfileForm.get("patientID").value);
      formData.append("address",this.patientProfileForm.get("address").value);
      formData.append("age",this.patientProfileForm.get("age").value);
      formData.append("emailID",this.patientProfileForm.get("emailID").value);
      formData.append("firstName",this.patientProfileForm.get("firstName").value);
      formData.append("lastName",this.patientProfileForm.get("lastName").value);
      formData.append("country",this.patientProfileForm.get("country").value);
      formData.append("gender",this.patientProfileForm.get("gender").value);
      formData.append("hospital_reg_num",this.patientProfileForm.get("hospital_reg_num").value);
      formData.append("medical_record_id",this.patientProfileForm.get("medical_record_id").value);
      formData.append("medical_personnel_id",this.patientProfileForm.get("medical_personnel_id").value);
      formData.append("postalCode",this.patientProfileForm.get("postalCode").value);
      formData.append("profilePic",this.patientProfileForm.get("profilePic").value);
      formData.append("state",this.patientProfileForm.get("state").value);
      formData.append("phoneNumber",this.patientProfileForm.get("phoneNumber").value);
      formData.append("countryCode",this.patientProfileForm.get("countryCode").value);
      formData.append("latitude",this.patientProfileForm.get("latitude").value);
      formData.append("longitude",this.patientProfileForm.get("longitude").value);
      this.loginService.updatePatient(formData,this.signObj.access_token).subscribe(
        (updatePatientReqRes)=>{
          console.log("Req Res data for update patient : ",updatePatientReqRes);
          if(updatePatientReqRes === 3){
            alert(updatePatientReqRes.message);
          }
          else{
            alert(updatePatientReqRes.message);
          }
        },
        (err:HttpErrorResponse)=>{
          if(err.error instanceof Error){
            console.log("Client Side Error",err);
            
          }else{
            console.log("Server Side",err);
          }
        }
      );
  
    }

}
