import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-all-medical-record',
  templateUrl: './all-medical-record.component.html',
  styleUrls: ['./all-medical-record.component.css']
})
export class AllMedicalRecordComponent implements OnInit {
  titleArray:any =
  {title:"Patient",
  subTitle:"Create Medical Record",
img:"assets/images/ui/Icons/patient-medical-module/Group 2494.png"};


previewImg1: any;
patientProfileForm: FormGroup;
editFamilyHistoryForm: FormGroup;
addAllergiesForm: FormGroup;

color: string;
color1: string;
color2: string;
color3: string;
textColor: string;
textColor1: string;
textColor2: string;
textColor3: string;
  constructor(private fb: FormBuilder,private cd: ChangeDetectorRef) { }

  ngOnInit() {
    
    this.previewImg1 = "../../../assets/images/ui/Icons/1x/profile-1.png";
    this.patientProfileForm = this.fb.group({
      patientID: [""],
      medical_record_number: [""],
      firstName: [""],
      lastName: [""],
      gender: [""],
      dob: [""],
      phoneNumber: [""],
      age: [""],
      emailID: [""],
      address: [""],
      city: [""],
      state: [""],
      country: [""],
      pincode: [""],     
      profilePic: [""]
    })
    this.editFamilyHistoryForm = this.fb.group({
      familyHistory: this.fb.array([
        
      ])
    });
    this.addAllergiesForm = this.fb.group({
      allergieHistory: this.fb.array([
        
      ])
    });
  }

  callPatientGeneralInfo(){
    this.textColor = 'white';
    this.textColor1 = 'black';
    console.log("pat gen info called");
    
  }

  callPatientMedicalReocrds(){    
    this.textColor = 'black';
    this.textColor1 = 'white';
    console.log("pat med records called");
    
  }

  //Image Upload Update Admin Gen User
  fileProgress1(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.patientProfileForm.get('profilePic').setValue(file);
        this.previewImg1 = reader.result
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }

   //get family history
   get familyDeseases() {
    return <FormArray>this.editFamilyHistoryForm.get('familyHistory')
  }//Add patient to the family history
  addMember() {
    this.familyDeseases.push(this.fb.group({
      dieseaseName: [""], 
      relationship: [""]
    }))
  }
  //Remove patient from family history
  removeDesease(index) {
    this.familyDeseases.removeAt(index)
  }
 
    //get Allergie
    get allergieData() {
      return <FormArray>this.addAllergiesForm.get('allergieHistory')
    }
    //Add Allergie
    addAllergie() {
      this.allergieData.push(this.fb.group({
        name: [""], 
        notes: [""]
      }))
    }
    //Remove Allergie
    removeAllergie(index) {
      this.allergieData.removeAt(index)
    }
 
    
  // payLoad = this.editFamilyHistoryForm.value.familyHistory;
}
