import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { AmazingTimePickerService } from 'amazing-time-picker';

import { from } from 'rxjs';
import { PatientProfileComponent } from '../patient-profile/patient-profile.component';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

interface SearchByValue {

  viewValue: string;
}

@Component({
  selector: 'app-patient-medical-records',
  templateUrl: './patient-medical-records.component.html',
  styleUrls: ['./patient-medical-records.component.css']
})
export class PatientMedicalRecordsComponent implements OnInit {

  basicExamForm: FormGroup;
  basicExamEditForm: FormGroup;
  systemExamForm: FormGroup;
  addPatientPhysicalExamFileForm: FormGroup;
  belowForm: FormGroup;
  belowEditForm: FormGroup;
  addPatImmunizationForm: FormGroup;
  editPatImmunizationForm: FormGroup;
  addPatIllnessForm: FormGroup;
  addPatientMedHistoryFileForm: FormGroup;
  addMedicationManuallyForm: FormGroup;
  editPatIllnessForm: FormGroup;
  selectedPatSystemExamData: any = [];
  selectedPatManualData: any;
  HaveBodyIndex: any;
  haveBodyIndexData: boolean = false;
  previewImg: any;
  loading: boolean;
  isLoading: boolean = false;
  isNoFile: boolean = false;
  closeResult: string;
  term: any;
  selected = 'All';
  signInRes: any;
  signObj: any;
  id: string;
  pMedPersonID: string;
  token: string;
  searchTable: string;
  selectedPatientData: any;
  fetchPatientPhysicalExamObj: any;
  fetchPatientImmunizationObj: any;
  fetchPatientMedicalRecordIllnessObj: any;
  patientPhysicalExamRecords: any;
  addPatientPhysicalExamManullyObj: any;
  updatePatientPhysicalExamManullyObj: any;
  deletePatientImmunizationRecordObj: any;
  addImmunizationDataObj: any;
  deletePatientPhyExamRecordObj: any;
  addPatMedicalRecordIllnessObj: any;
  addPatientIllnessMedicationObj: any;
  editPatIllnessObj: any;
  searchByValue: SearchByValue[] = [
    { viewValue: 'All' },
    { viewValue: 'Physical Examination' },
    { viewValue: 'Medical History' },
    { viewValue: 'Medications' },
    { viewValue: 'Surgery Procedures' },
    { viewValue: 'Immunizations' }
  ];

  data: any;
  dateToShow: any;
  createdIllnessID: any;

  isViewPhysicalExamination: boolean = false;
  isViewMedicalHistory: boolean = false;
  isViewMedications: boolean = false;
  isViewSurgicalProcedures: boolean = false;
  isViewImmunizations: boolean = false;

  viewBasicEx: boolean = false;
  viewSystemEx: boolean = false;

  viewManualInputView: boolean = false;
  viewAttachmentView: boolean = false;
  viewPatientIllness: boolean = true;
  viewPatientDiagnostic: boolean = true;
  viewPatientMedications: boolean = true;
  viewPatientSurgical: boolean = true;
  file: any;
  fileName: any;
  fileSize: any;
  fileValue: any;
  color: string;
  color1: string;
  color2: string;
  color3: string;
  textColor: string;
  textColor1: string;
  textColor2: string;
  textColor3: string;

  immunizations: any;
  PhysicalExamination: any;
  physicalExamination: any = [
    { "Date": "2020/01/02", "Doctor": "Dr.Raman", "Creator": "Babu" },
    { "Date": "2020/01/02", "Doctor": "Dr.Raman", "Creator": "Babu" },
    { "Date": "2020/01/02", "Doctor": "Dr.Raman", "Creator": "Babu" },
    { "Date": "2020/01/02", "Doctor": "Dr.Raman", "Creator": "Babu" }
  ];

  PhysicalExaminationData: any;
  physicalExaminationData: any = [
    {
      "category": "General Appearance",
      "description": "",
      "result": ""
    },
    {
      "category": "Vital Signs",
      "description": "",
      "result": ""
    },
    {
      "category": "Head",
      "description": "",
      "result": ""
    },
    {
      "category": "Heent",
      "description": "",
      "result": ""
    },
    {
      "category": "Neck",
      "description": "",
      "result": ""
    },
    {
      "category": "Chest and Lungs",
      "description": "",
      "result": ""
    },
    {
      "category": "Cardiovascular",
      "description": "",
      "result": ""
    },
    {
      "category": "Abdomen",
      "description": "",
      "result": ""
    },
    {
      "category": "Genitourinary",
      "description": "",
      "result": ""
    },
    {
      "category": "Rectal",
      "description": "",
      "result": ""
    },
    {
      "category": "Musculoskeletal",
      "description": "",
      "result": ""
    },
    {
      "category": "Lymph Nodes",
      "description": "",
      "result": ""
    },
    {
      "category": "Extremities/Skin",
      "description": "",
      "result": ""
    },
    {
      "category": "Neurological",
      "description": "",
      "result": ""
    }
  ]

  MedicalHistory: any;

  Medications: any;
  medications: any = [
    { "Date": "2020/01/02", "Medication": "Thyroxin", "Dosage": "100ml", "Frequency": "Daily", "Instructions": "Daily morning" },
    { "Date": "2020/01/02", "Medication": "Thyroxin", "Dosage": "100ml", "Frequency": "Daily", "Instructions": "Daily morning" },
    { "Date": "2020/01/02", "Medication": "Thyroxin", "Dosage": "100ml", "Frequency": "Daily", "Instructions": "Daily morning" },
    { "Date": "2020/01/02", "Medication": "Thyroxin", "Dosage": "100ml", "Frequency": "Daily", "Instructions": "Daily morning" },
  ];
  SurgeryProcedures: any;
  surgeryProcedures: any = [
    { "Date": "2020/01/02", "SurgeryName": "Skin replanatation", "Doctor": "Babu", "MoreInfo": "" },
    { "Date": "2020/01/02", "SurgeryName": "Skin replanatation", "Doctor": "Babu", "MoreInfo": "" },
    { "Date": "2020/01/02", "SurgeryName": "Skin replanatation", "Doctor": "Babu", "MoreInfo": "" },
    { "Date": "2020/01/02", "SurgeryName": "Skin replanatation", "Doctor": "Babu", "MoreInfo": "" }
  ];
  Immunizations: any;
  listOfImmunizations = [
    { value: 'Fever' },
    { value: 'Headache' },
    { value: 'Skin Allergy' },
    { value: 'Stomuch Pain' },
    { value: 'Teeth Effect' },
    { value: 'Dust Allergy' },
    { value: 'Knee Pain' }
  ];
  listOfIllnessConditions = [
    { value: 'Appointment Booked' },
    { value: 'In treatment' }
  ];
  @ViewChild('fileInput', { static: true }) el: ElementRef;
  constructor(private loginService: LoginService, private modalService: NgbModal, private atp: AmazingTimePickerService,
    private patProComponent: PatientProfileComponent, private fb: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loading = true;
    this.signInRes = localStorage.getItem("SignInRes");
    this.signObj = JSON.parse(this.signInRes);
    this.selectedPatientData = this.patProComponent.selectedPatient;
    this.Medications = this.medications;
    this.SurgeryProcedures = this.surgeryProcedures;
    this.PhysicalExaminationData = this.physicalExaminationData;

    this.showData;

    this.fetchPatientPhysicalExamRecords();
    this.fetchPatientImmunizationRecords();
    this.fetchPatientMedicalRecordIllness();
    this.basicExamForm = this.fb.group({
      height: [""],
      bmi: [""],
      weight: [""],
      // bmr:[""],
      waistline: [""],
      bloodPressure: [""],
      //heartPulse:[""]
    });

    this.basicExamEditForm = this.fb.group({
      height: [""],
      bmi: [""],
      weight: [""],
      // bmr:[""],
      waistline: [""],
      bloodPressure: [""],
      //heartPulse:[""]
    })

    this.belowForm = this.fb.group({
      other: [""],
      physicianCommentsOrRecomdations: [""]
    })

    this.belowEditForm = this.fb.group({
      other: [""],
      physicianCommentsOrRecomdations: [""]
    })

    this.systemExamForm = this.fb.group({
    })

    this.addPatientPhysicalExamFileForm = this.fb.group({
      medical_personnel_id: [""],
      patientID: [""],
      hospital_reg_num: [""],
      medical_record_id: [""],
      profilePic: [""]
    })

    this.addPatImmunizationForm = this.fb.group({
      appointmentTime: [""],
      immunizationName: [""],
      immunizationName1: [""],
      immunizationDate: [""],
      notes: [""]
    })

    this.editPatImmunizationForm = this.fb.group({
      appointmentTime: [""],
      immunizationName: [""],
      immunizationName1: [""],
      immunizationDate: [""],
      notes: [""]
    })

    this.addPatIllnessForm = this.fb.group({
      currentStatus: [""],
      symptoms: [""],
      moreInfo: [""],
      isCurrentIllness: ["true"]
    })

    this.editPatIllnessForm = this.fb.group({
      currentStatus: [""],
      symptoms: [""],
      moreInfo: [""],
      isCurrentIllness: ["true"]
    })

    this.addPatientMedHistoryFileForm = this.fb.group({
      profilePic: [""],
      prescription1MoreDetails: [""]
    })

    this.addMedicationManuallyForm = this.fb.group({
      medicationArray: this.fb.array([

      ])
    });

    this.addMedicationToList();

  }

  //Patch Family History
  patchPatientMedication(medicationData) {
    for (let i: number = 0; i <= medicationData.length - 1; i++) {
      this.medicationsObj.push(
        this.fb.group({
          name: medicationData[i].name,
          dosage: medicationData[i].dosage,
          freq: medicationData[i].freq
        })
      )
    }
  }

  //get family history
  get medicationsObj() {
    return <FormArray>this.addMedicationManuallyForm.get('medicationArray')
  }
  //Add patient to the family history
  addMedicationToList() {
    this.medicationsObj.push(this.fb.group({
      name: [""],
      dosage: [""],
      freq: [""]
    }))
  }
  //Remove patient from family history
  removeDesease(index) {
    this.medicationsObj.removeAt(index)
  }
  //Add Pat Illness Medication Manually
  addPatIllnessMedicationManuallySubmit() {
    this.isLoading = true;
    let payLoad = this.addMedicationManuallyForm.value.medicationArray;
    let medicationsArray: any[] = [];
    for (let i: number = 0; i <= payLoad.length - 1; i++) {
      medicationsArray.push(
        {
          "name": payLoad[i].name,
          "dosage": payLoad[i].dosage,
          "freq": payLoad[i].freq,
          "purpose": " ",
          "durationDays": " ",
          "moreDetails": " "
        }
      )
    }
    console.log("medicationsArray data from form : ", medicationsArray);
    this.addPatientIllnessMedicationObj = {
      "illnessID": this.createdIllnessID,
      "doctorMedicalPersonnelID": this.selectedPatientData.medical_personnel_id,
      "doctorName": " ",
      "medications": medicationsArray
    }
    console.log("the req for pat illness medications obj : ", this.addPatientIllnessMedicationObj);
    this.loginService.addPatientIllnessMedicationManualData(this.addPatientIllnessMedicationObj, this.signObj.access_token).
      subscribe(
        (res) => {
          console.log("res from add patient illness medications  : ", res)
          if (res.response === 3) {
            this.isLoading = false;
            this.loading = false;
            this.modalService.dismissAll();
            this.openSnackBar(res.message, "");

            //this.patientFamilyHistory = res.familyDiseases;
            this.ngOnInit();
            console.log("Res from Patient illness Medications Data : ", res.famliyDiseases);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            this.loading = false;
            this.openSnackBar(res.message, "");
            this.modalService.dismissAll();
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.isLoading = false;
            this.loading = false;
            console.log("Client Side Error")
          } else {
            this.isLoading = false;
            this.loading = false;
            console.log(err)
          }
        })
  }

  //Mat Snack Bar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 5000 })
  }

  showData(letSearch: string) {
    console.log("Print Value For Show Tables : ", letSearch);
    if (letSearch == "All") {
      this.term = "";
      this.isViewPhysicalExamination = false;
      this.isViewMedicalHistory = false;
      this.isViewMedications = false;
      this.isViewSurgicalProcedures = false;
      this.isViewImmunizations = false;
    } else {
      this.term = letSearch;
      this.searchTable = this.term;
      console.log("from else : ", this.searchTable);

      if (this.searchTable === "Physical Examination") {
        this.isViewPhysicalExamination = false;
        this.isViewMedicalHistory = true;
        this.isViewMedications = true;
        this.isViewSurgicalProcedures = true;
        this.isViewImmunizations = true;
      }
      else if (this.searchTable === "Medical History") {
        this.isViewPhysicalExamination = true;
        this.isViewMedicalHistory = false;
        this.isViewMedications = true;
        this.isViewSurgicalProcedures = true;
        this.isViewImmunizations = true;
      }
      else if (this.searchTable === "Medications") {
        this.isViewPhysicalExamination = true;
        this.isViewMedicalHistory = true;
        this.isViewMedications = false;
        this.isViewSurgicalProcedures = true;
        this.isViewImmunizations = true;
      }
      else if (this.searchTable === "Surgery Procedures") {
        this.isViewPhysicalExamination = true;
        this.isViewMedicalHistory = true;
        this.isViewMedications = true;
        this.isViewSurgicalProcedures = false;
        this.isViewImmunizations = true;
      }
      else if (this.searchTable === "Immunizations") {
        this.isViewPhysicalExamination = true;
        this.isViewMedicalHistory = true;
        this.isViewMedications = true;
        this.isViewSurgicalProcedures = true;
        this.isViewImmunizations = false;
      }
      else if (this.searchTable === "All") {
        this.isViewPhysicalExamination = false;
        this.isViewMedicalHistory = false;
        this.isViewMedications = false;
        this.isViewSurgicalProcedures = false;
        this.isViewImmunizations = false;
      }
      else {
        this.isViewPhysicalExamination = false;
        this.isViewMedicalHistory = false;
        this.isViewMedications = false;
        this.isViewSurgicalProcedures = false;
        this.isViewImmunizations = false;
      }

    }
  }

  viewBasicExam() {
    this.textColor2 = 'white';
    this.textColor3 = 'black';
    this.color2 = '#666565';
    this.color3 = 'white'
    this.viewSystemEx = false;
    this.viewBasicEx = true;
  }

  viewSystemExam() {
    this.textColor2 = 'black';
    this.textColor3 = 'white';
    this.color2 = 'white';
    this.color3 = '#666565'
    this.viewBasicEx = false;
    this.viewSystemEx = true;
  }

  viewManualInput() {
    this.textColor = 'white';
    this.textColor1 = 'black';
    this.color = '#53B9C6';
    this.color1 = 'white'
    this.viewManualInputView = true;
    this.viewAttachmentView = false;
  }

  viewAttachment() {
    this.textColor = 'black';
    this.textColor1 = 'white';
    this.color = 'white'
    this.color1 = '#53B9C6';
    this.viewAttachmentView = true;
    this.viewManualInputView = false;
  }

  //Image Upload
  fileProgress(event: any) {
    this.isNoFile = true;
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.fileName = file.name;
    this.fileSize = file.size;
    this.fileSize = this.fileSize / 1024;
    this.fileValue = "kb";
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.addPatientPhysicalExamFileForm.get('profilePic').setValue(file);
        this.previewImg = reader.result
      }
      // ChangeDetectorRef since file is loading outside the zone
      //this.cd.markForCheck();
    }
  }
  removeUploadedFile() {
    // let newFileList = Array.from(this.el.nativeElement.files);
    this.addPatientPhysicalExamFileForm.get('profilePic').setValue(null)
    this.fileName = null;
    this.fileSize = null;
    this.fileValue = null;
    this.isNoFile = false;
  }
  //Img Upload complete here

  //Image Upload
  fileProgress1(event: any) {
    this.isNoFile = true;
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    this.fileName = file.name;
    this.fileSize = file.size;
    this.fileSize = this.fileSize / 1024;
    this.fileValue = "kb";
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.addPatientMedHistoryFileForm.get('profilePic').setValue(file);
        this.previewImg = reader.result
      }
      // ChangeDetectorRef since file is loading outside the zone
      //this.cd.markForCheck();
    }
  }
  removeUploadedFile1() {
    // let newFileList = Array.from(this.el.nativeElement.files);
    this.addPatientMedHistoryFileForm.get('profilePic').setValue(null)
    this.fileName = null;
    this.fileSize = null;
    this.fileValue = null;
    this.isNoFile = false;
  }
  //Img Upload complete here

  //Add Patient Medical Record Illness Medication Attachment
  addPatientMedicalHistoryIllnessMedicationAttachmentSubmit() {
    this.isLoading = true;
    let formData = new FormData()

    formData.append("illnessID", this.createdIllnessID);
    formData.append("prescription1", this.addPatientMedHistoryFileForm.get('profilePic').value);
    formData.append("prescription1MoreDetails", this.addPatientMedHistoryFileForm.value.prescription1MoreDetails);
    formData.append("doctorMedicalPersonnelID", this.selectedPatientData.medical_personnel_id);
    formData.append("doctorName", " ")

    this.loginService.addPatientMedicalHistoryIllnessMedicationAttachment(formData, this.signObj.access_token).subscribe(
      (updateAdminGenUserData) => {
        console.log("res from add patient Medial-Record Illness Attachment data : ", updateAdminGenUserData);
        if (updateAdminGenUserData.response === 3) {
          this.isLoading = false;
          this.modalService.dismissAll();
          this.openSnackBar(updateAdminGenUserData.message, "");
          this.ngOnInit();
        }
        else {
          this.isLoading = false;
          //this.loading = false;
          this.modalService.dismissAll();
          this.openSnackBar(updateAdminGenUserData.message, "");
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.isLoading = false;
          //this.loading = false;
          console.log("Client Side Error", err);

        } else {
          this.isLoading = false;
          //this.loading = false;
          console.log("Server Side", err)
        }
      }
    );
  }

  //Add Patient Physical Exam File
  addPatientPhysicalExamFileSubmit() {
    this.isLoading = true;

    let payLoad = this.addPatientPhysicalExamFileForm.value
    let formData = new FormData()

    formData.append("medical_personnel_id", this.selectedPatientData.medical_personnel_id);
    formData.append("hospital_reg_num", this.selectedPatientData.hospital_reg_num);
    formData.append("patientID", this.selectedPatientData.patientID);
    formData.append("medical_record_id", this.selectedPatientData.medical_record_id);
    formData.append("physicalExamRecord", this.addPatientPhysicalExamFileForm.get('profilePic').value)

    this.loginService.addPatientPhysicalExamRecordAttachmentData(formData, this.signObj.access_token).subscribe(
      (updateAdminGenUserData) => {
        console.log("res from add patient phy exam Attachment data : ", updateAdminGenUserData);
        if (updateAdminGenUserData.response === 3) {
          this.isLoading = false;
          this.modalService.dismissAll();
          this.openSnackBar(updateAdminGenUserData.message, "");
          this.ngOnInit();
        }
        else {
          this.isLoading = false;
          //this.loading = false;
          this.modalService.dismissAll();
          this.openSnackBar(updateAdminGenUserData.message, "");
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.isLoading = false;
          //this.loading = false;
          console.log("Client Side Error", err);

        } else {
          this.isLoading = false;
          //this.loading = false;
          console.log("Server Side", err)
        }
      }
    );

  }

  //Add Patient Physical Exam Manually
  addPatientPhysicalExamManually(physicalExaminationData) {
    this.isLoading = true;
    let payload = this.basicExamForm.value;
    let physicalExamination: any[] = physicalExaminationData;

    this.addPatientPhysicalExamManullyObj = {
      "hospital_reg_num": this.selectedPatientData.hospital_reg_num,
      "patientID": this.selectedPatientData.patientID,
      "medical_record_id": this.selectedPatientData.medical_record_id,
      "medical_personnel_id": this.selectedPatientData.medical_personnel_id,
      "bodyIndex": payload,
      "physicalExamination": physicalExamination,
      "other": this.belowForm.value.other,
      "physicianCommentsOrRecomdations": this.belowForm.value.physicianCommentsOrRecomdations
    }

    console.log("the sended obj data for pat phy exam add manual : ", this.addPatientPhysicalExamManullyObj);
    this.loginService.addPatientPhysicalExamRecordsManually(this.addPatientPhysicalExamManullyObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.isLoading = false;
            //this.loading = false;
            this.modalService.dismissAll();
            this.openSnackBar(res.message, "");
            console.log("res from add patient physical exam records manually from component Success : ", res.message, res.physical_exam_id);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            //this.loading = false;
            this.openSnackBar(res.message, "");
            console.log("failure case", res.message);
            this.modalService.dismissAll();
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.isLoading = false;
            //this.loading = false;
            console.log("Client Side Error")
          } else {
            this.isLoading = false;
            //this.loading = false;
            console.log(err)
          }
        })
  }


  //Update Patient Physical Exam Manually
  updatePatientManualSubmit(selectedInvoicesData) {
    this.isLoading = true;
    this.selectedPatManualData = selectedInvoicesData;

    let formOneData = this.basicExamEditForm.value;

    let phyExamUpdateData: any[] = this.selectedPatSystemExamData;

    this.updatePatientPhysicalExamManullyObj = {
      "medical_personnel_id": selectedInvoicesData.medical_personnel_id,
      "hospital_reg_num": selectedInvoicesData.hospital_reg_num,
      "patientID": selectedInvoicesData.patientID,
      "medical_record_id": selectedInvoicesData.medical_record_id,
      "physical_exam_id": selectedInvoicesData.physical_exam_id,
      "bodyIndex": formOneData,
      "physicalExamination": phyExamUpdateData,
      "other": this.belowEditForm.value.other,
      "physicianCommentsOrRecomdations": this.belowEditForm.value.physicianCommentsOrRecomdations
    }

    console.log("the sended obj data for pat phy exam update manual : ", this.updatePatientPhysicalExamManullyObj);

    this.loginService.updatePatientPhysicalExamRecordsManually(this.updatePatientPhysicalExamManullyObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.isLoading = false;
            //this.loading = false;
            this.modalService.dismissAll();
            this.openSnackBar(res.message, "");
            console.log("res from update patient physical exam records manually from component Success : ", res.message, res.physical_exam_id);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            //this.loading = false;
            this.openSnackBar(res.message, "");
            console.log("failure case", res.message);
            this.modalService.dismissAll();
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.isLoading = false;
            //this.loading = false;
            console.log("Client Side Error")
          } else {
            this.isLoading = false;
            //this.loading = false;
            console.log(err)
          }
        })


  }

  //Fetch Patient Physical Exam Reocrds
  fetchPatientPhysicalExamRecords() {

    this.fetchPatientPhysicalExamObj = {
      "hospital_reg_num": this.selectedPatientData.hospital_reg_num,
      "patientID": this.selectedPatientData.patientID,
      "medical_record_id": this.selectedPatientData.medical_record_id,
      "medical_personnel_id": this.selectedPatientData.medical_personnel_id
    }
    this.loginService.getPatientPhysicalExamRecordsData(this.fetchPatientPhysicalExamObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.loading = false;
            this.PhysicalExamination = res.physical_exam_records;
            console.log("Res from Patient Phy Exam Records Data : ", this.PhysicalExamination);
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

  //Fetch Patient Immunization Reocrds
  fetchPatientImmunizationRecords() {

    this.fetchPatientImmunizationObj = {
      "hospital_reg_num": this.selectedPatientData.hospital_reg_num,
      "patientID": this.selectedPatientData.patientID,
      "medical_record_id": this.selectedPatientData.medical_record_id,
      "medical_personnel_id": this.selectedPatientData.medical_personnel_id
    }
    this.loginService.getPatientImmunizationRecordsData(this.fetchPatientImmunizationObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.loading = false;
            this.Immunizations = res.immunization_records;
            console.log("Res from Patient immunization_records Records Data : ", this.Immunizations);
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

  //Fetch Patient Medical Reocrd Illness
  fetchPatientMedicalRecordIllness() {

    this.fetchPatientMedicalRecordIllnessObj = {
      "hospital_reg_num": this.selectedPatientData.hospital_reg_num,
      "patientID": this.selectedPatientData.patientID,
      "medical_record_id": this.selectedPatientData.medical_record_id,
      "medical_personnel_id": this.selectedPatientData.medical_personnel_id
    }
    this.loginService.getPatientMedicalRecordsIllnessData(this.fetchPatientMedicalRecordIllnessObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.loading = false;
            this.MedicalHistory = res.illnessRecords;
            console.log("Res from fetchPatientMedicalRecordIllnessObj Records Data : ", this.MedicalHistory);
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

  onClick() {
    let type = "from"
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
      this.convertTime24to12(time, type)
    });
  }

  //Add Patient Immunization Data
  addPatImmunizationSubmit() {
    this.isLoading = true;
    let ngbDate = this.addPatImmunizationForm.controls['immunizationDate'].value;
    let myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    var dateAr = myDate.toLocaleDateString().split('/');
    var newDate = dateAr[2] + '/' + dateAr[0] + '/' + dateAr[1];
    var unixTimeData = new Date(newDate).getTime() / 1000;
    console.log("Immunization date mydate : ", unixTimeData);

    this.addImmunizationDataObj = {
      "hospital_reg_num": this.selectedPatientData.hospital_reg_num,
      "patientID": this.selectedPatientData.patientID,
      "medical_record_id": this.selectedPatientData.medical_record_id,
      "medical_personnel_id": this.selectedPatientData.medical_personnel_id,
      "immunizationName": this.addPatImmunizationForm.value.immunizationName,
      "immunizationDate": '' + unixTimeData,
      "notes": this.addPatImmunizationForm.value.notes
    }
    console.log("the sended obj data for pat immunization data add : ", this.addImmunizationDataObj);
    this.loginService.addPatientImmunizationData(this.addImmunizationDataObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.isLoading = false;
            //this.loading = false;
            this.modalService.dismissAll();
            this.openSnackBar(res.message, "");
            console.log("res from add patient immunization data from component Success : ", res.message, res.immunization_record_id);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            //this.loading = false;
            this.openSnackBar(res.message, "");
            console.log("failure case", res.message);
            this.modalService.dismissAll();
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.isLoading = false;
            //this.loading = false;
            console.log("Client Side Error")
          } else {
            this.isLoading = false;
            //this.loading = false;
            console.log(err)
          }
        })

  }

  //Add Pat Medical Illness Record
  addPatMedicalRecordIllnessSubmit() {
    this.isLoading = true;
    this.addPatMedicalRecordIllnessObj = {
      "hospital_reg_num": this.selectedPatientData.hospital_reg_num,
      "patientID": this.selectedPatientData.patientID,
      "medical_record_id": this.selectedPatientData.medical_record_id,
      "medical_personnel_id": this.selectedPatientData.medical_personnel_id,
      "symptoms": this.addPatIllnessForm.value.symptoms,
      "currentStatus": this.addPatIllnessForm.value.currentStatus,
      "moreInfo": this.addPatIllnessForm.value.moreInfo,
      "isCurrentIllness": this.addPatIllnessForm.value.isCurrentIllness
    }
    console.log("the sended obj data for pat immunization data add : ", this.addPatMedicalRecordIllnessObj);
    this.loginService.addPatientMedicalRecordIllnessData(this.addPatMedicalRecordIllnessObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.openPatientDiagnostic();
            this.isLoading = false;
            this.createdIllnessID = res.illnessID;
            //this.loading = false;
            //this.modalService.dismissAll();
            this.openSnackBar(res.message, "");
            this.ngOnInit();
            console.log("res from add patient medical record illness data from component Success : ", res.message, res.illnessID);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            //this.loading = false;
            this.openSnackBar(res.message, "");
            console.log("failure case", res.message);
            //this.modalService.dismissAll();
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.isLoading = false;
            //this.loading = false;
            console.log("Client Side Error")
          } else {
            this.isLoading = false;
            //this.loading = false;
            console.log(err)
          }
        })
  }

  //Update Pat Immunization Data
  editPatImmunizationSubmit(selectedInvoicesData) {
    this.isLoading = true;
    //   let ngbDate = this.editPatImmunizationForm.controls['immunizationDate'].value;
    // let myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    // this.editPatImmunizationForm.patchValue({ immunizationDate: myDate.toLocaleDateString() })
    // console.log("sended date format : ",myDate.toLocaleDateString().split("/").reverse().join("/"));
    // var dateAr = myDate.toLocaleDateString().split('/');
    // var newDate = dateAr[2] + '/' + dateAr[0] + '/' + dateAr[1];
    // console.log("new date yyyy/mm/dd",newDate);
    let ngbDate = this.editPatImmunizationForm.controls['immunizationDate'].value;
    let myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    var dateAr = myDate.toLocaleDateString().split('/');
    var newDate = dateAr[2] + '/' + dateAr[0] + '/' + dateAr[1];
    var unixTimeData = new Date(newDate).getTime() / 1000;

    let editImmunizationsObj = {
      "hospital_reg_num": selectedInvoicesData.hospital_reg_num,
      "patientID": selectedInvoicesData.patientID,
      "medical_record_id": selectedInvoicesData.medical_record_id,
      "medical_personnel_id": selectedInvoicesData.medical_personnel_id,
      "immunization_record_id": selectedInvoicesData.immunization_record_id,
      "immunizationName": this.editPatImmunizationForm.value.immunizationName,
      "immunizationDate": '' + unixTimeData,
      "notes": this.editPatImmunizationForm.value.notes
    }
    console.log("Req for Edit Immunization Data : ", editImmunizationsObj);

    this.loginService.updatePatientImmunizationData(editImmunizationsObj, this.signObj.access_token).subscribe(
      (resForRescheduleAppointment) => {
        if (resForRescheduleAppointment.response === 3) {
          this.isLoading = false;
          this.modalService.dismissAll();
          this.ngOnInit();
          this.openSnackBar(resForRescheduleAppointment.message, "");
        }
        else {
          this.isLoading = false;
          console.log(resForRescheduleAppointment.message);
          alert(resForRescheduleAppointment.message);
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.isLoading = false;
          this.loading = false;
          console.log("Client Side Error", err);
        } else {
          this.isLoading = false;
          this.loading = false;
          console.log("Server Side", err)
        }
      }
    )
  }

  //Edit Pat Illness Data
  editPatIllnessSubmit(selectedMedicalHistory) {
    console.log("the data : ",selectedMedicalHistory);
    
    this.isLoading = true;
    let editPatIllnessObj = {
      "medical_personnel_id": selectedMedicalHistory.medical_personnel_id,
      "hospital_reg_num": selectedMedicalHistory.hospital_reg_num,
      "patientID": selectedMedicalHistory.patientID,
      "medical_record_id": selectedMedicalHistory.medical_record_id,
      "illnessID": selectedMedicalHistory.illnessID,
      "symptoms": this.editPatIllnessForm.value.symptoms,
      "currentStatus": this.editPatIllnessForm.value.currentStatus,
      "moreInfo": this.editPatIllnessForm.value.moreInfo,
      "startDate": " ",
      "endDate": " ",
      "isCurrentIllness": true
    }
    console.log("Updated Illness Data : ",editPatIllnessObj);
    
    this.loginService.updatePatientIllnessData(editPatIllnessObj, this.signObj.access_token).subscribe(
      (res) => {
        if (res.response === 3) {
          this.isLoading = false;
          this.modalService.dismissAll();
          this.ngOnInit();
          this.openSnackBar(res.message, "");
        }
        else {
          this.isLoading = false;
          console.log(res.message);
          alert(res.message);
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.isLoading = false;
          this.loading = false;
          console.log("Client Side Error", err);
        } else {
          this.isLoading = false;
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

  viewAddPhysicalExamContent(addPhysicalExamContent) {
    this.viewManualInput();
    this.viewBasicExam();
    this.modalService.open(addPhysicalExamContent, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAddMedicalHistoryMethod(addMedicalHistoryModel) {
    this.viewPatientIllness = false;
    this.viewManualInput();
    this.modalService.open(addMedicalHistoryModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditMedicalHistoryMethod(editMedicalHistoryModel, selectedMedicalHistory) {
    this.viewPatientIllness = false;
    this.viewManualInput();
    this.editPatIllnessForm.patchValue({
      "currentStatus": (selectedMedicalHistory.currentStatus) || (selectedMedicalHistory.currentStatus !== " "),
      "symptoms": selectedMedicalHistory.symptoms,
      "moreInfo": selectedMedicalHistory.moreInfo
    })
    this.modalService.open(editMedicalHistoryModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAddMedicationsMethod(addMedicationsModel) {
    this.modalService.open(addMedicationsModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAddSurgicalProceduresMethod(addSurgicalProceduresModel) {
    this.modalService.open(addSurgicalProceduresModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openAddImmunizationsMethod(addImmunizationsModel) {
    this.modalService.open(addImmunizationsModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openViewModal(viewContent) {
    this.modalService.open(viewContent, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openViewMedicalHistoryMethod(viewMedicalHistoryModel) {
    this.modalService.open(viewMedicalHistoryModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditPatExamRecordModal(viewPatExamRecordsContent) {
    this.viewManualInput();
    this.viewBasicExam();
    this.modalService.open(viewPatExamRecordsContent, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditPhyExamModal(viewEditPhyExamContent, selectedInvoicesData) {
    this.HaveBodyIndex = selectedInvoicesData.bodyIndex;
    if (this.HaveBodyIndex === undefined) {
      this.viewAttachmentView = true;
      console.log("dont have bodyindex");
      this.haveBodyIndexData = false;
      console.log("selected phy exam attachment : ", selectedInvoicesData.attachment);
    }
    else {
      this.viewAttachmentView = true;
      this.haveBodyIndexData = false;
      this.basicExamEditForm.patchValue({
        height: selectedInvoicesData.bodyIndex.height,
        bmi: selectedInvoicesData.bodyIndex.bmi,
        weight: selectedInvoicesData.bodyIndex.weight,
        // bmr:[""],
        waistline: selectedInvoicesData.bodyIndex.waistline,
        bloodPressure: selectedInvoicesData.bodyIndex.bloodPressure,
      })

      this.selectedPatSystemExamData = selectedInvoicesData.physicalExamination;
      console.log("selectedPatSystemExamData : ", this.selectedPatSystemExamData);

      this.belowEditForm.patchValue({
        other: selectedInvoicesData.other,
        physicianCommentsOrRecomdations: selectedInvoicesData.physicianCommentsOrRecomdations
      })
      this.viewManualInput();
      this.viewBasicExam();
      this.modalService.open(viewEditPhyExamContent, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;

      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  openEditImmunizationsMethod(editImmunizationsModel, selectedInvoicesData) {
    //this.dateToShow = selectedInvoicesData.immunizationDate;
    let date = new Date(selectedInvoicesData.immunizationDate).toLocaleDateString().split("/", 3)

    let unixDates = selectedInvoicesData.immunizationDate;
    var date1 = new Date(unixDates * 1000);
    this.dateToShow = date1.getFullYear() + '-' + ('0' + (date1.getMonth() + 1)).slice(-2) + '-' + ('0' + date1.getDate()).slice(-2);

    console.log("unix to date format : ", this.dateToShow);

    this.editPatImmunizationForm.get('immunizationDate').setValue({
      "year": parseInt(date[2]),
      "month": parseInt(date[1]),
      "day": parseInt(date[0])
    })
    this.editPatImmunizationForm.patchValue({
      "immunizationName": selectedInvoicesData.immunizationName,
      "immunizationName1": selectedInvoicesData.immunizationName,
      "immunizationDate": selectedInvoicesData.immunizationDate,
      "notes": selectedInvoicesData.notes
    })
    this.modalService.open(editImmunizationsModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  openViewImmunizationModal(viewImmunizationModel, selectedInvoicesData) {

    this.modalService.open(viewImmunizationModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  openDeletePhyExamModal(viewDeletePhyExamContent) {
    this.modalService.open(viewDeletePhyExamContent, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openDeleteMedicalHistoryMethod(viewDeleteMedicalHistoryModel) {
    this.modalService.open(viewDeleteMedicalHistoryModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openDeleteImmunizationMethod(viewDeleteImmunizationModel) {
    this.modalService.open(viewDeleteImmunizationModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  deletePatientPhyExamData(selectedInvoicesData) {
    this.isLoading = true;
    this.deletePatientPhyExamRecordObj = {
      "hospital_reg_num": selectedInvoicesData.hospital_reg_num,
      "medical_personnel_id": selectedInvoicesData.medical_personnel_id,
      "medical_record_id": selectedInvoicesData.medical_record_id,
      "patientID": selectedInvoicesData.patientID,
      "physical_exam_id": selectedInvoicesData.physical_exam_id
    }
    this.loginService.deletePatientPhysicalExamRecordData(this.deletePatientPhyExamRecordObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.isLoading = false;
            //this.loading = false;
            this.modalService.dismissAll();
            this.openSnackBar(res.message, "");
            this.fetchPatientPhysicalExamRecords();
            // this.ngOnInit()
            console.log("Res from Patient Phy Exam Data Delete : ", res.message);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            //this.loading = false;
            this.modalService.dismissAll();
            this.openSnackBar(res.message, "");
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.isLoading = false;
            //this.loading = false;
            console.log("Client Side Error")
          } else {
            this.isLoading = false;
            //this.loading = false;
            console.log(err)
          }
        })
  }

  //Delete Immunization Record
  deletePatientImmunizationData(selectedInvoicesData) {
    this.isLoading = true;
    this.deletePatientImmunizationRecordObj = {
      "hospital_reg_num": selectedInvoicesData.hospital_reg_num,
      "medical_personnel_id": selectedInvoicesData.medical_personnel_id,
      "medical_record_id": selectedInvoicesData.medical_record_id,
      "patientID": selectedInvoicesData.patientID,
      "immunization_record_id": selectedInvoicesData.immunization_record_id
    }
    this.loginService.deletePatientImmunizationRecordData(this.deletePatientImmunizationRecordObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.isLoading = false;
            //this.loading = false;
            this.modalService.dismissAll();
            this.openSnackBar(res.message, "");
            this.fetchPatientImmunizationRecords();
            // this.ngOnInit()
            console.log("Res from Patient Immunization Record Data Delete : ", res.message);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            //this.loading = false;
            this.modalService.dismissAll();
            this.openSnackBar(res.message, "");
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.isLoading = false;
            //this.loading = false;
            console.log("Client Side Error")
          } else {
            this.isLoading = false;
            //this.loading = false;
            console.log(err)
          }
        })
  }

  //For Time Picker
  public convertTime24to12(time24, type) {
    var tmpArr = time24.split(':'), time12;
    if (+tmpArr[0] == 12) {
      time12 = tmpArr[0] + ':' + tmpArr[1] + ' PM';
    }
    else {
      if (+tmpArr[0] == 0) {
        time12 = '12:' + tmpArr[1] + ' AM';
      }
      else {
        if (+tmpArr[0] > 12) {
          time12 = (+tmpArr[0] - 12) + ':' + tmpArr[1] + ' PM';
        }
        else {
          time12 = (+tmpArr[0]) + ':' + tmpArr[1] + ' AM';
        }
      }
    }
    return time12;
  }

  selectTime() {
    let type = "from"
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
      this.convertTime24to12(time, type)
    });
  }

  //Medical-History Button actions
  openPatientIllness() {
    this.viewPatientIllness = false;
    this.viewPatientDiagnostic = true;
    this.viewPatientMedications = true;
    this.viewPatientSurgical = true;
  }
  openPatientDiagnostic() {
    this.viewPatientIllness = true;
    this.viewPatientDiagnostic = false;
    this.viewPatientMedications = true;
    this.viewPatientSurgical = true;
  }
  openPatientMedications() {
    this.viewPatientIllness = true;
    this.viewPatientDiagnostic = true;
    this.viewPatientMedications = false;
    this.viewPatientSurgical = true;
  }
  openPatientSurgical() {
    this.viewPatientIllness = true;
    this.viewPatientDiagnostic = true;
    this.viewPatientMedications = true;
    this.viewPatientSurgical = false;
  }



}
