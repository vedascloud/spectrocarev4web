import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

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
  addPatIllnessDiagnosisForm: FormGroup;
  editPatIllnessDiagnosisForm: FormGroup;
  addPatIllnessSurgicalForm: FormGroup;
  editPatIllnessSurgicalForm: FormGroup;
  addPatientMedHistoryFileForm: FormGroup;
  editPatientMedHistoryFileForm: FormGroup;
  editPatIllnessForm: FormGroup;
  addPatIllMedicationManuallyForm: FormGroup;
  editPatIllMedicationManuallyForm: FormGroup;
  viewPatDiagnosticForm: FormGroup;
  viewPatSurgicalForm: FormGroup;
  viewPatMedicationForm: FormGroup;
  selectedPatSystemExamData: any = [];
  medicalPersonnels: any = [];
  filteredMedicalPersonnels: any = [];
  medicalPersonnelObj: any;
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
  addPatIllnessDiagnosisDataObj: any;
  deletePatientPhyExamRecordObj: any;
  addPatMedicalRecordIllnessObj: any;
  addPatientIllnessMedicationObj: any;
  illnessMedicationID: any;
  editPatientIllnessMedicationObj: any;
  editPatIllnessObj: any;
  medicinesData: any = [];

  searchByValue: SearchByValue[] = [
    { viewValue: 'All' },
    { viewValue: 'Physical Examination' },
    { viewValue: 'Medical History' },
    { viewValue: 'Medications' },
    { viewValue: 'Surgery Procedures' },
    { viewValue: 'Immunizations' }
  ];

  illnessDiagnosticNotes: any;
  illnessMedications: any;
  illnessSurgicalProcedures: any;

  selectedRow: any;
  fetchPatIllMedicationDataObj: any;
  illnessMedicationRecordsData: any = [];
  illnessSurgicalRecordsData: any = [];
  illnessDiagnosisRecordsData: any = [];
  
  medicationAttachmentData: any=[];

  data: any;
  dateToShow: any;
  dateToShow2: any;
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

  viewManualInputView2: boolean = false;
  viewAttachmentView2: boolean = false;
  viewPatientIllness2: boolean = true;
  viewPatientDiagnostic2: boolean = true;
  viewPatientMedications2: boolean = true;
  viewPatientSurgical2: boolean = true;

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
  constructor(private loginService: LoginService, private modalService: NgbModal,
    private patProComponent: PatientProfileComponent, private fb: FormBuilder, private _snackBar: MatSnackBar,
  ) { }

  //private atp: AmazingTimePickerService,

  ngOnInit() {

    //this.a.a1 = {"a11":"do it"} 

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
      notes: [""],
      byWhom: [""],
      byWhomID: [""],
      doctorMPID: [""],
      doctorName: [""]
    })

    this.editPatImmunizationForm = this.fb.group({
      appointmentTime: [""],
      immunizationName: [""],
      immunizationName1: [""],
      immunizationDate: [""],
      notes: [""],
      byWhom: [""],
      byWhomID: [""],
      doctorMPID: [""],
      doctorName: [""],
      immunization_record_id: [""]
    })

    this.addPatIllnessForm = this.fb.group({
      illnessCondition: [""],
      symptoms: [""],
      currentStatus: [""],
      description: [""],
      isCurrentIllness: [""],
      startDate: [""],
      endDate: [""]
    })

    this.editPatIllnessForm = this.fb.group({
      illnessCondition: [""],
      symptoms: [""],
      currentStatus: [""],
      description: [""],
      isCurrentIllness: [""],
      startDate: [""],
      endDate: [""]
    })

    this.addPatIllnessDiagnosisForm = this.fb.group({
      diagnosisDate: [""],
      diagnosis: [""],
      prescription: [""],
      remark: [""],
      byWhom: [""],
      byWhomID: [""],
      doctorMedicalPersonnelID: [""],
      doctorName: [""]
    })

    this.editPatIllnessDiagnosisForm = this.fb.group({
      diagnosisDate: [""],
      doctorName: [""],
      diagnosis: [""],
      prescription: [""],
      remark: [""]
    })

    this.addPatIllnessSurgicalForm = this.fb.group({
      surgeryDate: [""],
      surgeryProcedure: [""],
      surgeryInformation: [""],
      profilePic: [""],
      moreDetails: [""],
      doctorMedicalPersonnelID: [""],
      doctorName: [""]
    })

    this.editPatIllnessSurgicalForm = this.fb.group({
      lastUpdateDate: [""],
      time: [""],
      doctorName: [""],
      surgeryProcedure: [""],
      surgeryInformation: [""]
    })

    this.addPatientMedHistoryFileForm = this.fb.group({
      profilePic: [""],
      prescription1MoreDetails: [""]
    })

    this.editPatientMedHistoryFileForm = this.fb.group({
      profilePic: [""],
      prescription1MoreDetails: [""]
    })

    this.addPatIllMedicationManuallyForm = this.fb.group({
      addMedicationArray: this.fb.array([

      ])
    });

    this.editPatIllMedicationManuallyForm = this.fb.group({
      editMedicationArray: this.fb.array([

      ])
    });

    this.viewPatDiagnosticForm = this.fb.group({
      "diagnosisDate": [""],
      "doctorName": [""],
      "diagnosis": [""],
      "prescription": [""],
      "remark": [""]
    })

    this.viewPatSurgicalForm = this.fb.group({
      "lastUpdateDate": [""],
      "time": [""],
      "doctorName": [""],
      "surgeryProcedure": [""],
      "moreInfo": [""]
    });

    this.viewPatMedicationForm = this.fb.group({
      "medicationDate": [""],
      "instructions": [""]
    })

    this.addMedicationToList();
    this.editMedicationToList();

    let medicalObj = {
      "userID": this.signObj.hospitalAdmin.userID,
      "category": "All",
      "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num,
      "token": this.signObj.access_token
    }
    this.getDoctorData(medicalObj);
  }

  getDoctorData(medicalObj) {
    this.loginService.getMedicalPatientData(medicalObj).subscribe(
      (res) => {
        if (res.response === 3) {
          this.medicalPersonnels = res.medicalPersonnels;
          this.filteredMedicalPersonnels = res.medicalPersonnels;
          console.log("list of doctors : ", this.medicalPersonnels);
        }
        else {
          alert(res.message);
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

  selectDoctorFromList(value: any) {
    console.log(value);
    let index = -1
    index = this.medicalPersonnels.findIndex(val => {
      return val.medical_personnel_id === value.medical_personnel_id
    })
    if (index != -1) {
      this.medicalPersonnelObj = this.medicalPersonnels[index]
      console.log("medicalPersonnelObj obj", this.medicalPersonnelObj)
      this.addPatImmunizationForm.patchValue({
        doctorName: this.medicalPersonnelObj.firstName + " " + this.medicalPersonnelObj.lastName,
        doctorMPID: this.medicalPersonnelObj.emailID,
        byWhomID: this.medicalPersonnelObj.medical_personnel_id,
        byWhom: "medical personnel"
      })
      this.editPatImmunizationForm.patchValue({
        doctorName: this.medicalPersonnelObj.firstName + " " + this.medicalPersonnelObj.lastName,
        doctorMPID: this.medicalPersonnelObj.emailID,
        byWhomID: this.signObj.hospitalAdmin.userID,
        byWhom: "admin"
      })
      this.addPatIllnessDiagnosisForm.patchValue({
        doctorName: this.medicalPersonnelObj.firstName + " " + this.medicalPersonnelObj.lastName,
        doctorMedicalPersonnelID: this.medicalPersonnelObj.emailID,
        byWhomID: this.medicalPersonnelObj.medical_personnel_id,
        byWhom: "medical personnel"
      })
      this.addPatIllnessSurgicalForm.patchValue({
        doctorName: this.medicalPersonnelObj.firstName + " " + this.medicalPersonnelObj.lastName,
        doctorMedicalPersonnelID: this.medicalPersonnelObj.medical_personnel_id,
      })

      
      //this.modalService.close();
      //this.modalService.dismissAll()
    }
  }

  searchDoctor(term: string) {
    if (!term) {
      this.filteredMedicalPersonnels = this.medicalPersonnels;
    } else {
      this.filteredMedicalPersonnels = this.medicalPersonnels.filter(x =>
        x.firstName.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  }

  //get medications
  get addmedicationsObj() {
    return <FormArray>this.addPatIllMedicationManuallyForm.get('addMedicationArray')
  }
  get editmedicationsObj() {
    return <FormArray>this.editPatIllMedicationManuallyForm.get('editMedicationArray')
  }

  //Add medication to list
  addMedicationToList() {
    this.addmedicationsObj.push(this.fb.group({
      name: [""],
      dosage: [""],
      freq: [""]
    }))
  }
  editMedicationToList() {
    this.editmedicationsObj.push(this.fb.group({
      name: [""],
      dosage: [""],
      freq: [""]
    }))
  }

  //Remove medication from list
  removeAddMedication(index) {
    this.addmedicationsObj.removeAt(index)
  }
  removeEditMedication(index) {
    this.editmedicationsObj.removeAt(index)
  }

  //Patch Medication
  patchPatientEditMedication(editmedicationData) {
    for (let i: number = 0; i <= editmedicationData.length - 1; i++) {
      this.addmedicationsObj.push(
        this.fb.group({
          name: editmedicationData[i].name,
          dosage: editmedicationData[i].dosage,
          freq: editmedicationData[i].freq
        })
      )
    }
  }
  patchPatientUpdateEditMedication(editupdatemedicationData) {
    for (let i: number = 0; i <= editupdatemedicationData.length - 1; i++) {
      this.editmedicationsObj.push(
        this.fb.group({
          name: editupdatemedicationData[i].name,
          dosage: editupdatemedicationData[i].dosage,
          freq: editupdatemedicationData[i].freq
        })
      )
    }
  }

  //Add Pat Illness Medication Manually
  addPatIllnessMedicationManuallySubmit() {
    this.isLoading = true;
    let payLoad = this.addPatIllMedicationManuallyForm.value.addMedicationArray;
    let addMedicationArray: any[] = [];
    for (let i: number = 0; i <= payLoad.length - 1; i++) {
      addMedicationArray.push(
        {
          "name": payLoad[i].name,
          "dosage": payLoad[i].dosage,
          "freq": payLoad[i].freq,
          "purpose": " ",
          "durationDays": 5,
          "moreDetails": " "
        }
      )
    }
    console.log("addMedicationArray data from form : ", addMedicationArray);
    this.addPatientIllnessMedicationObj = {
      "hospital_reg_num": this.addPatIllnessDiagnosisDataObj.hospital_reg_num,
      "byWhom": this.addPatIllnessDiagnosisDataObj.byWhom,
      "byWhomID": this.addPatIllnessDiagnosisDataObj.byWhomID,
      "patientID": this.addPatIllnessDiagnosisDataObj.patientID,
      "medical_record_id": this.addPatIllnessDiagnosisDataObj.medical_record_id,
      "illnessID": this.addPatIllnessDiagnosisDataObj.illnessID,
      "doctorMedicalPersonnelID": this.addPatIllnessDiagnosisDataObj.doctorMedicalPersonnelID,
      "doctorName": this.addPatIllnessDiagnosisDataObj.doctorName,
      "medications": addMedicationArray
    }
    console.log("the req for add pat illness medications obj : ", this.addPatientIllnessMedicationObj);
    this.loginService.addPatientIllnessMedicationManualData(this.addPatientIllnessMedicationObj, this.signObj.access_token).
      subscribe(
        (res) => {
          console.log("res from add patient illness medications  : ", res)
          if (res.response === 3) {
            this.isLoading = false;
            this.loading = false;
            this.illnessMedicationID = res.illnessMedicationID;
            this.viewAttachment();
            alert(res.message);
            this.openSnackBar(res.message, "");
            this.ngOnInit();
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

  //Update Pat Illness Medication Manually
  editPatIllnessMedicationManuallySubmit() {
    // this.isLoading = true;
    // let payLoad = this.editPatIllMedicationManuallyForm.value.editMedicationArray;
    // let editMedicationArray: any[] = [];
    // for (let i: number = 0; i <= payLoad.length - 1; i++) {
    //   editMedicationArray.push(
    //     {
    //       "name": payLoad[i].name,
    //       "dosage": payLoad[i].dosage,
    //       "freq": payLoad[i].freq,
    //       "purpose": " ",
    //       "durationDays": 5,
    //       "moreDetails": " "
    //     }
    //   )
    // }
    // console.log("edit medicationsArray data from form : ", editMedicationArray);
    // this.editPatientIllnessMedicationObj = {
    //   "hospital_reg_num": "AP2317293903",
    //   "byWhom": "medical personnel",
    //   "byWhomID": "AK2ckMn4",
    //   "patientID": "PID89fif",
    //   "medical_record_id": "MRIDiMuGST",
    //   "illnessID": this.createdIllnessID,
    //   "doctorMedicalPersonnelID": this.selectedPatientData.medical_personnel_id,
    //   "doctorName": " ",
    //   "illnessMedicationID": "IMID97wQ3r",
    //   "medications": editMedicationArray
    // }
    // console.log("the req for update pat illness medications obj : ", this.editPatientIllnessMedicationObj);
    // this.loginService.updatePatientIllnessMedicationManualData(this.editPatientIllnessMedicationObj, this.signObj.access_token).
    //   subscribe(
    //     (res) => {
    //       console.log("res from add patient illness medications  : ", res)
    //       if (res.response === 3) {
    //         this.isLoading = false;
    //         this.loading = false;
    //         this.viewAttachment();
    //         this.openSnackBar(res.message, "");
    //         this.ngOnInit();
    //         console.log("Res from Patient illness Medications Data : ", res);
    //       }
    //       else if (res.response === 0) {
    //         this.isLoading = false;
    //         this.loading = false;
    //         this.openSnackBar(res.message, "");
    //         this.modalService.dismissAll();
    //       }
    //     },
    //     (err: HttpErrorResponse) => {
    //       if (err.error instanceof Error) {
    //         this.isLoading = false;
    //         this.loading = false;
    //         console.log("Client Side Error")
    //       } else {
    //         this.isLoading = false;
    //         this.loading = false;
    //         console.log(err)
    //       }
    //     })
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

  viewManualInput2() {
    this.textColor = 'white';
    this.textColor1 = 'black';
    this.color = '#53B9C6';
    this.color1 = 'white'
    this.viewManualInputView2 = true;
    this.viewAttachmentView2 = false;
  }

  viewAttachment2() {
    this.textColor = 'black';
    this.textColor1 = 'white';
    this.color = 'white'
    this.color1 = '#53B9C6';
    this.viewAttachmentView2 = true;
    this.viewManualInputView2 = false;
  }

  //Image Upload
  fileProgress(event: any) {
    this.isNoFile = true;
    let reader = new FileReader();
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
    }
  }
  removeUploadedFile() {
    // let newFileList = Array.from(this.el.nativeElement.files);
    //this.isNoFile = ;
    this.addPatientPhysicalExamFileForm.get('profilePic').setValue(null)
    this.fileName = null;
    this.fileSize = null;
    this.fileValue = null;
    this.isNoFile = false;
  }
  //Img Upload complete here

  //editPatientMedHistoryFileForm file Upload
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
        this.editPatientMedHistoryFileForm.get('profilePic').setValue(file);
        this.previewImg = reader.result
      }
      // ChangeDetectorRef since file is loading outside the zone
      //this.cd.markForCheck();
    }
  }
  removeUploadedFile1() {
    // let newFileList = Array.from(this.el.nativeElement.files);
    this.editPatientMedHistoryFileForm.get('profilePic').setValue(null)
    this.fileName = null;
    this.fileSize = null;
    this.fileValue = null;
    this.isNoFile = false;
  }
  //Img Upload complete here

  // addPatientMedHistoryFileForm File Upload
  fileProgress2(event: any) {
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
  removeUploadedFile2() {
    // let newFileList = Array.from(this.el.nativeElement.files);
    this.addPatientMedHistoryFileForm.get('profilePic').setValue(null)
    this.fileName = null;
    this.fileSize = null;
    this.fileValue = null;
    this.isNoFile = false;
  }
  //Img Upload complete here
  // addPatientMedHistoryFileForm File Upload
  fileProgress3(event: any) {
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
        this.addPatIllnessSurgicalForm.get('profilePic').setValue(file);
        this.previewImg = reader.result
      }
      // ChangeDetectorRef since file is loading outside the zone
      //this.cd.markForCheck();
    }
  }
  removeUploadedFile3() {
    // let newFileList = Array.from(this.el.nativeElement.files);
    this.addPatIllnessSurgicalForm.get('profilePic').setValue(null)
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

    formData.append("illnessID", this.addPatientIllnessMedicationObj.illnessID);
    formData.append("prescription1", this.addPatientMedHistoryFileForm.get('profilePic').value);
    formData.append("prescription1MoreDetails", this.addPatientMedHistoryFileForm.value.prescription1MoreDetails);
    formData.append("illnessMedicationID", this.illnessMedicationID);
    formData.append("doctorMedicalPersonnelID", this.addPatientIllnessMedicationObj.doctorMedicalPersonnelID);
    formData.append("doctorName", this.addPatientIllnessMedicationObj.doctorName);
    formData.append("patientID", this.addPatientIllnessMedicationObj.patientID);
    formData.append("medical_record_id", this.addPatientIllnessMedicationObj.medical_record_id);
    formData.append("byWhom", this.addPatientIllnessMedicationObj.byWhom);
    formData.append("byWhomID", this.addPatientIllnessMedicationObj.byWhomID);
    formData.append("hospital_reg_num", this.addPatientIllnessMedicationObj.hospital_reg_num);

    this.loginService.addPatientMedicalHistoryIllnessMedicationAttachment(formData, this.signObj.access_token).subscribe(
      (updateAdminGenUserData) => {
        console.log("res from add patient Medial-Record Illness Attachment data : ", updateAdminGenUserData);
        if (updateAdminGenUserData.response === 3) {
          this.isLoading = false;
          this.removeUploadedFile2();      
          alert(updateAdminGenUserData.message);    
          this.openSnackBar(updateAdminGenUserData.message, "");
          this.openPatientSurgical();
          //this.modalService.dismissAll();
          this.ngOnInit();
        }
        else {
          this.isLoading = false;
          //this.loading = false;
          alert(updateAdminGenUserData.message);
          this.openSnackBar(updateAdminGenUserData.message, "");
          this.modalService.dismissAll();
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

  //edit Patient Medical Record Illness Medication Attachment
  editPatientMedicalHistoryIllnessMedicationAttachmentSubmit() {
    // this.isLoading = true;
    // let formData = new FormData()

    // formData.append("illnessID", this.createdIllnessID);
    // formData.append("prescription1", this.editPatientMedHistoryFileForm.get('profilePic').value);
    // formData.append("prescription1MoreDetails", this.editPatientMedHistoryFileForm.value.prescription1MoreDetails);
    // formData.append("illnessMedicationID", this.selectedPatientData.illnessMedicationID);
    // formData.append("doctorMedicalPersonnelID", this.selectedPatientData.medical_personnel_id);
    // formData.append("doctorName", " ")

    // this.loginService.editPatientMedicalHistoryIllnessMedicationAttachment(formData, this.signObj.access_token).subscribe(
    //   (updateAdminGenUserData) => {
    //     console.log("res from add patient Medial-Record Illness Attachment data : ", updateAdminGenUserData);
    //     if (updateAdminGenUserData.response === 3) {
    //       this.isLoading = false;
    //       this.openPatientSurgical();
    //       this.openSnackBar(updateAdminGenUserData.message, "");
    //       this.ngOnInit();
    //     }
    //     else {
    //       this.isLoading = false;
    //       this.modalService.dismissAll();
    //       this.openSnackBar(updateAdminGenUserData.message, "");
    //     }
    //   },
    //   (err: HttpErrorResponse) => {
    //     if (err.error instanceof Error) {
    //       this.isLoading = false;
    //       console.log("Client Side Error", err);

    //     } else {
    //       this.isLoading = false;
    //       console.log("Server Side", err)
    //     }
    //   }
    // );
  }

  //Add Patient Physical Exam File
  addPatientPhysicalExamFileSubmit() {
    this.isLoading = true;

    let payLoad = this.addPatientPhysicalExamFileForm.value
    let formData = new FormData()

    formData.append("byWhomID", this.selectedPatientData.medical_personnel_id);
    formData.append("hospital_reg_num", this.selectedPatientData.hospital_reg_num);
    formData.append("patientID", this.selectedPatientData.patientID);
    formData.append("medical_record_id", this.selectedPatientData.medical_record_id);
    formData.append("physicalExamRecord", this.addPatientPhysicalExamFileForm.get('profilePic').value);
    formData.append("byWhom", "medical personnel");

    this.loginService.addPatientPhysicalExamRecordAttachmentData(formData, this.signObj.access_token).subscribe(
      (updateAdminGenUserData) => {
        console.log("res from add patient phy exam Attachment data : ", updateAdminGenUserData);
        if (updateAdminGenUserData.response === 3) {
          this.isLoading = false;
          this.removeUploadedFile();
          this.openSnackBar(updateAdminGenUserData.message, "");
          this.modalService.dismissAll();
          this.ngOnInit();
        }
        else {
          this.isLoading = false;
          //this.loading = false;
          this.openSnackBar(updateAdminGenUserData.message, "");
          this.modalService.dismissAll();
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
    //let payload = this.basicExamForm.value;
    
    let payload = {
      
        "height": ''+this.basicExamForm.value.height,
        "weight": ''+this.basicExamForm.value.weight,
        "waistline":  ''+this.basicExamForm.value.waistline,
        "bmi": ''+this.basicExamForm.value.bmi,
        "bloodPressure": ''+this.basicExamForm.value.bloodPressure
        
    }
    
    let physicalExamination: any[] = physicalExaminationData;

    this.addPatientPhysicalExamManullyObj = {
      "hospital_reg_num": this.selectedPatientData.hospital_reg_num,
      "patientID": this.selectedPatientData.patientID,
      "medical_record_id": this.selectedPatientData.medical_record_id,
      "byWhom": "medical personnel",
      "byWhomID": this.selectedPatientData.medical_personnel_id,
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
            this.openSnackBar(res.message, "");
            this.viewAttachment();
            //this.loading = false;
            //this.modalService.dismissAll();
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
      //"medical_personnel_id": selectedInvoicesData.medical_personnel_id,
      "hospital_reg_num": selectedInvoicesData.hospital_reg_num,
      "patientID": selectedInvoicesData.patientID,
      "medical_record_id": selectedInvoicesData.medical_record_id,
      "byWhom": "medical personnel",
      "byWhomID": this.selectedPatientData.medical_personnel_id,
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
            this.ngOnInit();
            //this.loading = false;
            this.openSnackBar(res.message, "");
            this.modalService.dismissAll();
            console.log("res from update patient physical exam records manually from component Success : ", res.message, res.physical_exam_id);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            //this.loading = false;
            this.modalService.dismissAll();
            this.openSnackBar(res.message, "");
            console.log("failure case", res.message);
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
      "byWhomID": this.selectedPatientData.medical_personnel_id,
      "byWhom": "medical personnel"
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
      "byWhom": "admin",
      "byWhomID": this.signObj.hospitalAdmin.userID
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
      "byWhomID": this.selectedPatientData.medical_personnel_id,
      "byWhom": "medical personnel"
    }
    this.loginService.getPatientMedicalRecordsIllnessData(this.fetchPatientMedicalRecordIllnessObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.loading = false;
            //this.a.a1 = res.illnessRecords;
            this.MedicalHistory = res.illnessRecords;
            console.log("fetched illness records data is : ", this.MedicalHistory);
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

  //Add Patient Immunization Data
  addPatImmunizationSubmit() {
    this.isLoading = true;
    let ngbDate = this.addPatImmunizationForm.controls['immunizationDate'].value;
    let myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    var dateAr = myDate.toLocaleDateString().split('/');
    var newDate = dateAr[2] + '/' + dateAr[0] + '/' + dateAr[1];
    var unixTimeData = new Date(newDate).getTime() / 1000;
    console.log("Immunization date mydate : ", unixTimeData);
    //console.log("Add PAt Immunization Form Data : ",this.addPatImmunizationForm);
    this.addImmunizationDataObj = {
      "hospital_reg_num": this.selectedPatientData.hospital_reg_num,
      "immunizationName": this.addPatImmunizationForm.value.immunizationName,
      "immunizationDate": '' + unixTimeData,
      "notes": this.addPatImmunizationForm.value.notes,
      "patientID": this.selectedPatientData.patientID,
      "medical_record_id": this.selectedPatientData.medical_record_id,
      "byWhom": this.addPatImmunizationForm.value.byWhom,
      "byWhomID": this.addPatImmunizationForm.value.byWhomID,
      "doctorMPID": this.addPatImmunizationForm.value.byWhomID,
      "doctorName": this.addPatImmunizationForm.value.doctorName
    }
    console.log("the sended obj data for pat immunization data add : ", this.addImmunizationDataObj);
    this.loginService.addPatientImmunizationData(this.addImmunizationDataObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.isLoading = false;
            this.fetchPatientImmunizationRecords();
            this.loading = false;
            this.openSnackBar(res.message, "");
            this.modalService.dismissAll();
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
    let ngbDate = this.addPatIllnessForm.controls['startDate'].value;
    let myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    var dateAr = myDate.toLocaleDateString().split('/');
    var newDate = dateAr[2] + '/' + dateAr[0] + '/' + dateAr[1];
    var unixTimeData = new Date(newDate).getTime() / 1000;

    console.log("start date : ", unixTimeData);

    let ngbDate1 = this.addPatIllnessForm.controls['endDate'].value;
    let myDate1 = new Date(ngbDate1.year, ngbDate1.month - 1, ngbDate1.day);
    var dateAr1 = myDate1.toLocaleDateString().split('/');
    var newDate1 = dateAr1[2] + '/' + dateAr1[0] + '/' + dateAr1[1];
    var unixTimeData1 = new Date(newDate1).getTime() / 1000;

    console.log("end date : ", unixTimeData1);

    this.addPatMedicalRecordIllnessObj = {
      "hospital_reg_num": this.selectedPatientData.hospital_reg_num,
      "patientID": this.selectedPatientData.patientID,
      "medical_record_id": this.selectedPatientData.medical_record_id,
      "illnessCondition": this.addPatIllnessForm.value.illnessCondition,
      "symptoms": this.addPatIllnessForm.value.symptoms,
      "currentStatus": this.addPatIllnessForm.value.currentStatus,
      "description": this.addPatIllnessForm.value.description,
      "isCurrentIllness": this.addPatIllnessForm.value.isCurrentIllness,
      "byWhom": "medical personnel",
      "byWhomID": this.selectedPatientData.medical_personnel_id,
      "startDate": '' + unixTimeData,
      "endDate": '' + unixTimeData1
    }
    console.log("the sended obj data for pat immunization data add : ", this.addPatMedicalRecordIllnessObj);
    this.loginService.addPatientMedicalRecordIllnessData(this.addPatMedicalRecordIllnessObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.openSnackBar(res.message, "");
            alert(res.message);
            this.openPatientDiagnostic();
            this.isLoading = false;
            this.createdIllnessID = res.illnessID;
            //this.loading = false;
            //this.modalService.dismissAll();
            this.ngOnInit();
            console.log("res from add patient medical record illness data from component Success : ", res.message, res.illnessID);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            //this.loading = false;
            alert(res.message);
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

  //Add Pat Medical Diagnosis Notes
  addPatMedicalRecordDiagnosisNotesSubmit() {
    this.isLoading = true;
    let ngbDate = this.addPatIllnessDiagnosisForm.controls['diagnosisDate'].value;
    let myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    var dateAr = myDate.toLocaleDateString().split('/');
    var newDate = dateAr[2] + '/' + dateAr[0] + '/' + dateAr[1];
    var unixTimeData = new Date(newDate).getTime() / 1000;
    console.log("add ill medication date mydate : ", unixTimeData);
    //console.log("Add PAt Immunization Form Data : ",this.addPatImmunizationForm);
    this.addPatIllnessDiagnosisDataObj = {
      "hospital_reg_num": this.selectedPatientData.hospital_reg_num,
      "byWhom": this.addPatIllnessDiagnosisForm.value.byWhom,
      "byWhomID": this.addPatIllnessDiagnosisForm.value.byWhomID,
      "patientID": this.selectedPatientData.patientID,
      "medical_record_id": this.selectedPatientData.medical_record_id,
      "illnessID": this.createdIllnessID,
      "doctorMedicalPersonnelID": this.addPatIllnessDiagnosisForm.value.byWhomID,
      "doctorName": this.addPatIllnessDiagnosisForm.value.doctorName,
      "diagnosisDate": '' + unixTimeData,
      "diagnosis": this.addPatIllnessDiagnosisForm.value.diagnosis,
      "prescription": this.addPatIllnessDiagnosisForm.value.prescription,
      "remark": this.addPatIllnessDiagnosisForm.value.remark,

    }
    console.log("the sended obj data for pat ill diAgnosis data add : ", this.addPatIllnessDiagnosisDataObj);
    this.loginService.addPatientIllnessDiagnosisData(this.addPatIllnessDiagnosisDataObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.isLoading = false;
            alert(res.message);
            this.openSnackBar(res.message, "");
            this.openPatientMedications();
            //this.loading = false;
            //this.modalService.dismissAll();
            console.log("res from add patient ill diagnosis data from component Success : ", res.message);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            //this.loading = false;
            alert(res.message);
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

  //Add Pat Medical Diagnosis Notes
  addPatIllSurgicalFormSubmit() {
    this.isLoading = true;
    let ngbDate = this.addPatIllnessSurgicalForm.controls['surgeryDate'].value;
    let myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    var dateAr = myDate.toLocaleDateString().split('/');
    var newDate = dateAr[2] + '/' + dateAr[0] + '/' + dateAr[1];
    var unixTimeData = new Date(newDate).getTime() / 1000;
    console.log("add ill addPatIllnessSurgicalForm date mydate : ", unixTimeData);
    //console.log("Add PAt Immunization Form Data : ",this.addPatImmunizationForm);

    let payLoad = this.addPatIllnessSurgicalForm.value;
    let formData = new FormData()

    formData.append("patientID", this.addPatientIllnessMedicationObj.patientID);
    formData.append("medical_record_id", this.addPatientIllnessMedicationObj.medical_record_id);
    formData.append("hospital_reg_num", this.addPatientIllnessMedicationObj.hospital_reg_num);
    formData.append("illnessID", this.addPatientIllnessMedicationObj.illnessID);
    formData.append("byWhom", this.addPatientIllnessMedicationObj.byWhom);
    formData.append("byWhomID", this.addPatientIllnessMedicationObj.byWhomID);
    formData.append("surgicalRecord", this.addPatIllnessSurgicalForm.get('profilePic').value);
    formData.append("moreDetails", this.addPatIllnessSurgicalForm.value.moreDetails);
    formData.append("doctorMedicalPersonnelID", this.addPatIllnessSurgicalForm.value.doctorMedicalPersonnelID);
    formData.append("doctorName", this.addPatIllnessSurgicalForm.value.doctorName);
    formData.append("surgeryProcedure", this.addPatIllnessSurgicalForm.value.surgeryProcedure);
    formData.append("surgeryDate", '' + unixTimeData);
    //formData.append("surgeryInformtion", this.addPatIllnessSurgicalForm.value.surgeryInformation);

    console.log("the sended obj data for pat ill surgical record data add : ", formData);
    this.loginService.addPatIllSurgicalFormData(formData, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.isLoading = false;
            this.removeUploadedFile3();
            //this.openPatientMedications();
            //this.loading = false;
            alert(res.message);
            this.openSnackBar(res.message, "");
            this.modalService.dismissAll();
            console.log("res from add patient ill surgical data from component Success : ", res.message);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            //this.loading = false;
            alert(res.message);
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

  //Update Pat Immunization Data
  editPatImmunizationSubmit(selectedInvoicesData) {
    this.isLoading = true;

    let ngbDate = this.editPatImmunizationForm.controls['immunizationDate'].value;
    let myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    var dateAr = myDate.toLocaleDateString().split('/');
    var newDate = dateAr[2] + '/' + dateAr[0] + '/' + dateAr[1];
    var unixTimeData = new Date(newDate).getTime() / 1000;

    let editImmunizationsObj = {
      "hospital_reg_num": selectedInvoicesData.hospital_reg_num,
      "patientID": selectedInvoicesData.patientID,
      "medical_record_id": selectedInvoicesData.medical_record_id,
      "immunization_record_id": selectedInvoicesData.immunization_record_id,
      "immunizationName": this.editPatImmunizationForm.value.immunizationName,
      "immunizationDate": '' + unixTimeData,
      "notes": this.editPatImmunizationForm.value.notes,
      "byWhom": "admin",
      "byWhomID": this.signObj.hospitalAdmin.userID,
      "doctorMPID": this.editPatImmunizationForm.value.doctorMPID || selectedInvoicesData.doctorMPID,
      "doctorName": this.editPatImmunizationForm.value.doctorName || selectedInvoicesData.doctorName
    }
    console.log("Req for Edit Immunization Data : ", editImmunizationsObj);

    this.loginService.updatePatientImmunizationData(editImmunizationsObj, this.signObj.access_token).subscribe(
      (resForRescheduleAppointment) => {
        if (resForRescheduleAppointment.response === 3) {
          this.isLoading = false;
          this.openSnackBar(resForRescheduleAppointment.message, "");
          this.modalService.dismissAll();
          this.ngOnInit();
        }
        else {
          this.isLoading = false;
          this.openSnackBar(resForRescheduleAppointment.message, "");
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
    console.log("the data : ", selectedMedicalHistory);

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
    console.log("Updated Illness Data : ", editPatIllnessObj);

    this.loginService.updatePatientIllnessData(editPatIllnessObj, this.signObj.access_token).subscribe(
      (res) => {
        if (res.response === 3) {
          this.isLoading = false;
          this.openSnackBar(res.message, "");
          this.modalService.dismissAll();
          this.ngOnInit();
        }
        else {
          this.isLoading = false;
          this.openSnackBar(res.message, "");
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
      this.removeUploadedFile();
      this.removeUploadedFile1();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.removeUploadedFile();
      this.removeUploadedFile1();
      return 'by clicking on a backdrop';
    } else {
      this.removeUploadedFile();
      this.removeUploadedFile1();
      return `with: ${reason}`;
    }
  }

  //Open DoctorsList Model
  openDoctorMethod(doctorsModel) {
    this.modalService.open(doctorsModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

    this.openPatientIllness()
    //this.viewPatientIllness = false;
    this.viewManualInput();
    this.modalService.open(addMedicalHistoryModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditMedicalHistoryMethod(editMedicalHistoryModel, selectedMedicalHistory) {

    var timestamp = selectedMedicalHistory.startDate; // replace your timestamp
    var date1 = new Date(timestamp * 1000);
    this.dateToShow = ('0' + date1.getFullYear()).slice(-2) + '-' + ('0' + (date1.getMonth() + 1)).slice(-2) + '-' + date1.getDate();

    var timestamp2 = selectedMedicalHistory.endDate; // replace your timestamp
    var date2 = new Date(timestamp2 * 1000);
    this.dateToShow2 = ('0' + date2.getFullYear()).slice(-2) + '-' + ('0' + (date2.getMonth() + 1)).slice(-2) + '-' + date2.getDate();

    this.openPatientIllness2();
    //this.viewPatientIllness2 = false;
    this.viewManualInput2();
    this.editPatIllnessForm.patchValue({

      "illnessCondition": selectedMedicalHistory.illnessCondition,
      "symptoms": selectedMedicalHistory.symptoms,
      "currentStatus": selectedMedicalHistory.currentStatus,
      "description": selectedMedicalHistory.description,
      "isCurrentIllness": selectedMedicalHistory.isCurrentIllness,
      "startDate": selectedMedicalHistory.startDate,
      "endDate": selectedMedicalHistory.endDate

    })


    this.fetchPatIllMedicationDataObj = {
      "hospital_reg_num": selectedMedicalHistory.hospital_reg_num,
      "byWhom": "admin",
      "byWhomID": this.signObj.hospitalAdmin.userID,
      "patientID": selectedMedicalHistory.patientID,
      "medical_record_id": selectedMedicalHistory.medical_record_id,
      "illnessID": selectedMedicalHistory.illnessID
    }
    this.loginService.fetchPatientMedicationData(this.fetchPatIllMedicationDataObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.illnessMedications = res.illnessMedicationRecords;
            this.medicinesData = this.illnessMedications[0].mannualPrescriptions.medicines;
            this.medicationAttachmentData = this.illnessMedications[0].attachedPrescriptions.attachments;
            let unixDates = this.illnessMedications[0].mannualPrescriptions.updateDate.addedDate / 1000;
            var date1 = new Date(unixDates * 1000);
            let dateToShow44 = date1.getFullYear() + '-' + ('0' + (date1.getMonth() + 1)).slice(-2) + '-' + ('0' + date1.getDate()).slice(-2);
            this.editPatientMedHistoryFileForm.patchValue({
              "medicationDate": dateToShow44,
              "prescription1MoreDetails": this.medicationAttachmentData[0].moreDetails
            })

            let payLoad = this.editPatIllMedicationManuallyForm.value.editMedicationArray;
            let editMedicationArray: any[] = [];
            for (let i: number = 0; i <= payLoad.length - 1; i++) {
              editMedicationArray.push(
                {
                  "name": payLoad[i].name,
                  "dosage": payLoad[i].dosage,
                  "freq": payLoad[i].freq
                }
              )
            }
            //this.illnessMedicationRecordsData.push(res.illnessMedicationRecords);
            this.isLoading = false;
            this.loading = false;
            this.openSnackBar(res.message, "");
            console.log("res from fetchPatientMedicationData Success : ", res.message);
            console.log("the fetched Ill Medication Records Data is : ", this.illnessMedications);
            console.log("medication date : ", this.illnessMedications[0].mannualPrescriptions.updateDate.addedDate);

          }
          else if (res.response === 0) {
            this.isLoading = false;
            this.openSnackBar(res.message, "");
            console.log("failure case", res.message);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.isLoading = false;
            console.log("Client Side Error")
          } else {
            this.isLoading = false;
            console.log(err)
          }
        })

    this.loginService.fetchPatientSurgicalData(this.fetchPatIllMedicationDataObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.illnessSurgicalProcedures = res.illnessSurgicalRecords;
            let unixDates = this.illnessSurgicalProcedures[0].surgeryDate;
            var date1 = new Date(unixDates * 1000);
            let dateToShow = date1.getFullYear() + '-' + ('0' + (date1.getMonth() + 1)).slice(-2) + '-' + ('0' + date1.getDate()).slice(-2);
            let timeToShow = date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
            this.editPatIllnessSurgicalForm.patchValue({
              "lastUpdateDate": dateToShow,
              "time": timeToShow,
              "doctorName": this.illnessSurgicalProcedures[0].doctorName,
              "surgeryProcedure": this.illnessSurgicalProcedures[0].surgeryProcedure,
              "surgeryInformation": this.illnessSurgicalProcedures[0].surgeryInformation
            })
            this.isLoading = false;
            this.loading = false;
            this.openSnackBar(res.message, "");
            console.log("res from illnessSurgicalRecordsData Success : ", res.message);
            console.log("the fetched illnessSurgicalRecordsData is : ", this.illnessSurgicalProcedures);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            this.openSnackBar(res.message, "");
            console.log("failure case", res.message);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.isLoading = false;
            console.log("Client Side Error")
          } else {
            this.isLoading = false;
            console.log(err)
          }
        })

    this.loginService.fetchPatientDiagnosisData(this.fetchPatIllMedicationDataObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.illnessDiagnosticNotes = res.illnessDiagnosisRecords;


            let unixDates = this.illnessDiagnosticNotes[0].diagnosisDate;
            var date11 = new Date(unixDates * 1000);
            var dateToShow12 = date11.getFullYear() + '-' + ('0' + (date11.getMonth() + 1)).slice(-2) + '-' + ('0' + date11.getDate()).slice(-2);

            this.editPatIllnessDiagnosisForm.patchValue({
              "diagnosisDate": dateToShow12,
              "doctorName": this.illnessDiagnosticNotes[0].doctorName,
              "diagnosis": this.illnessDiagnosticNotes[0].diagnosis,
              "prescription": this.illnessDiagnosticNotes[0].prescription,
              "remark": this.illnessDiagnosticNotes[0].remark
            })
            this.isLoading = false;
            this.loading = false;
            this.openSnackBar(res.message, "");
            console.log("res from illnessDiagnosisRecordsData Success : ", res.message);
            console.log("the fetched illnessDiagnosisRecordsData is : ", this.illnessDiagnosticNotes);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            this.openSnackBar(res.message, "");
            console.log("failure case", res.message);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.isLoading = false;
            console.log("Client Side Error")
          } else {
            this.isLoading = false;
            console.log(err)
          }
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

  openViewMedicalHistoryMethod(viewMedicalHistoryModel, selectedMedicalHistory) {
    this.isLoading = false;
    this.loading = false;
    this.fetchPatIllMedicationDataObj = {
      "hospital_reg_num": selectedMedicalHistory.hospital_reg_num,
      "byWhom": "admin",
      "byWhomID": this.signObj.hospitalAdmin.userID,
      "patientID": selectedMedicalHistory.patientID,
      "medical_record_id": selectedMedicalHistory.medical_record_id,
      "illnessID": selectedMedicalHistory.illnessID
    }
    this.loginService.fetchPatientMedicationData(this.fetchPatIllMedicationDataObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.illnessMedications = res.illnessMedicationRecords;
            this.medicinesData = this.illnessMedications[0].mannualPrescriptions.medicines;

            let unixDates = this.illnessMedications[0].mannualPrescriptions.updateDate.addedDate / 1000;
            var date1 = new Date(unixDates * 1000);
            let dateToShow44 = date1.getFullYear() + '-' + ('0' + (date1.getMonth() + 1)).slice(-2) + '-' + ('0' + date1.getDate()).slice(-2);
            this.viewPatMedicationForm.patchValue({
              "medicationDate": dateToShow44,
              "instructions": "------------"
            })
            //this.illnessMedicationRecordsData.push(res.illnessMedicationRecords);
            this.isLoading = false;
            this.loading = false;
            this.openSnackBar(res.message, "");
            console.log("res from fetchPatientMedicationData Success : ", res.message);
            console.log("the fetched Ill Medication Records Data is : ", this.illnessMedications);
            console.log("medication date : ", this.illnessMedications[0].mannualPrescriptions.updateDate.addedDate);

          }
          else if (res.response === 0) {
            this.isLoading = false;
            this.openSnackBar(res.message, "");
            console.log("failure case", res.message);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.isLoading = false;
            console.log("Client Side Error")
          } else {
            this.isLoading = false;
            console.log(err)
          }
        })

    this.loginService.fetchPatientSurgicalData(this.fetchPatIllMedicationDataObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.illnessSurgicalProcedures = res.illnessSurgicalRecords;
            let unixDates = this.illnessSurgicalProcedures[0].surgeryDate;
            var date1 = new Date(unixDates * 1000);
            this.dateToShow = date1.getFullYear() + '-' + ('0' + (date1.getMonth() + 1)).slice(-2) + '-' + ('0' + date1.getDate()).slice(-2);
            let timeToShow = date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
            this.viewPatSurgicalForm.patchValue({
              "lastUpdateDate": this.dateToShow,
              "time": timeToShow,
              "doctorName": this.illnessSurgicalProcedures[0].doctorName,
              "surgeryProcedure": this.illnessSurgicalProcedures[0].surgeryProcedure,
              "moreInfo": "----------"
            })
            this.isLoading = false;
            this.loading = false;
            this.openSnackBar(res.message, "");
            console.log("res from illnessSurgicalRecordsData Success : ", res.message);
            console.log("the fetched illnessSurgicalRecordsData is : ", this.illnessSurgicalProcedures);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            this.openSnackBar(res.message, "");
            console.log("failure case", res.message);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.isLoading = false;
            console.log("Client Side Error")
          } else {
            this.isLoading = false;
            console.log(err)
          }
        })

    this.loginService.fetchPatientDiagnosisData(this.fetchPatIllMedicationDataObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.illnessDiagnosticNotes = res.illnessDiagnosisRecords;


            let unixDates = this.illnessDiagnosticNotes[0].diagnosisDate;
            var date11 = new Date(unixDates * 1000);
            var dateToShow11 = date11.getFullYear() + '-' + ('0' + (date11.getMonth() + 1)).slice(-2) + '-' + ('0' + date11.getDate()).slice(-2);

            this.viewPatDiagnosticForm.patchValue({
              "diagnosisDate": dateToShow11,
              "doctorName": this.illnessDiagnosticNotes[0].doctorName,
              "diagnosis": this.illnessDiagnosticNotes[0].diagnosis,
              "prescription": this.illnessDiagnosticNotes[0].prescription,
              "remark": this.illnessDiagnosticNotes[0].remark
            })
            this.isLoading = false;
            this.loading = false;
            this.openSnackBar(res.message, "");
            console.log("res from illnessDiagnosisRecordsData Success : ", res.message);
            console.log("the fetched illnessDiagnosisRecordsData is : ", this.illnessDiagnosticNotes);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            this.openSnackBar(res.message, "");
            console.log("failure case", res.message);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            this.isLoading = false;
            console.log("Client Side Error")
          } else {
            this.isLoading = false;
            console.log(err)
          }
        })

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
    // if (this.HaveBodyIndex === undefined) {
    if (selectedInvoicesData.attachment) {
      this.viewManualInputView = false;
      this.viewAttachmentView = false;
      console.log("dont have bodyindex");
      //this.haveBodyIndexData = false;
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
      "notes": selectedInvoicesData.notes,
      "doctorName": selectedInvoicesData.doctorName
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

  openDeleteMedicalHistoryMethod(viewDeleteMedicalHistoryModel, selectedMedicalHistory) {
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

  //
  deletePatientPhyExamData(selectedMedicalHistory) {
    this.isLoading = true;
    this.deletePatientPhyExamRecordObj = {
      "hospital_reg_num": selectedMedicalHistory.hospital_reg_num,
      "medical_record_id": selectedMedicalHistory.medical_record_id,
      "patientID": selectedMedicalHistory.patientID,
      "physical_exam_id": selectedMedicalHistory.physical_exam_id,
      "byWhom": "admin",
      "byWhomID": this.signObj.hospitalAdmin.userID
    }
    this.loginService.deletePatientPhysicalExamRecordData(this.deletePatientPhyExamRecordObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.isLoading = false;
            //this.loading = false;
            this.openSnackBar(res.message, "");
            this.modalService.dismissAll();
            this.fetchPatientPhysicalExamRecords();
            // this.ngOnInit()
            console.log("Res from Patient Phy Exam Data Delete : ", res.message);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            //this.loading = false;
            this.openSnackBar(res.message, "");
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

  deletePatientIllnessData(selectedMedicalHistory) {
    this.isLoading = true;
    this.deletePatientPhyExamRecordObj = {
      "hospital_reg_num": selectedMedicalHistory.hospital_reg_num,
      "medical_record_id": selectedMedicalHistory.medical_record_id,
      "patientID": selectedMedicalHistory.patientID,
      "illnessID": selectedMedicalHistory.illnessID,
      "byWhom": "admin",
      "byWhomID": this.signObj.hospitalAdmin.userID
    }
    this.loginService.deletePatientIllnessRecordData(this.deletePatientPhyExamRecordObj, this.signObj.access_token).
      subscribe(
        (res) => {
          if (res.response === 3) {
            this.isLoading = false;
            //this.loading = false;
            this.openSnackBar(res.message, "");
            this.modalService.dismissAll();
            this.fetchPatientMedicalRecordIllness();
            // this.ngOnInit()
            console.log("Res from Patient Illness Data Delete : ", res.message);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            //this.loading = false;
            this.openSnackBar(res.message, "");
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

  //Delete Immunization Record
  deletePatientImmunizationData(selectedInvoicesData) {
    this.isLoading = true;
    this.deletePatientImmunizationRecordObj = {
      "hospital_reg_num": selectedInvoicesData.hospital_reg_num,
      "byWhom": "admin",
      "byWhomID": this.signObj.hospitalAdmin.userID,
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
            this.openSnackBar(res.message, "");
            this.modalService.dismissAll();
            this.fetchPatientImmunizationRecords();
            // this.ngOnInit()
            console.log("Res from Patient Immunization Record Data Delete : ", res.message);
          }
          else if (res.response === 0) {
            this.isLoading = false;
            //this.loading = false;
            this.openSnackBar(res.message, "");
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

  // //For Time Picker
  // public convertTime24to12(time24, type) {
  //   var tmpArr = time24.split(':'), time12;
  //   if (+tmpArr[0] == 12) {
  //     time12 = tmpArr[0] + ':' + tmpArr[1] + ' PM';
  //   }
  //   else {
  //     if (+tmpArr[0] == 0) {
  //       time12 = '12:' + tmpArr[1] + ' AM';
  //     }
  //     else {
  //       if (+tmpArr[0] > 12) {
  //         time12 = (+tmpArr[0] - 12) + ':' + tmpArr[1] + ' PM';
  //       }
  //       else {
  //         time12 = (+tmpArr[0]) + ':' + tmpArr[1] + ' AM';
  //       }
  //     }
  //   }
  //   return time12;
  // }

  // selectTime() {
  //   let type = "from"
  //   const amazingTimePicker = this.atp.open();
  //   amazingTimePicker.afterClose().subscribe(time => {
  //     console.log(time);
  //     this.convertTime24to12(time, type)
  //   });
  // }

  // onClick() {
  //   let type = "from"
  //   const amazingTimePicker = this.atp.open();
  //   amazingTimePicker.afterClose().subscribe(time => {
  //     console.log(time);
  //     this.convertTime24to12(time, type)
  //   });
  // }

  //Medical-History Add Button actions
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

  //Medical-History Edit Button actions
  openPatientIllness2() {
    this.viewPatientIllness2 = false;
    this.viewPatientDiagnostic2 = true;
    this.viewPatientMedications2 = true;
    this.viewPatientSurgical2 = true;
  }
  openPatientDiagnostic2() {
    this.viewPatientIllness2 = true;
    this.viewPatientDiagnostic2 = false;
    this.viewPatientMedications2 = true;
    this.viewPatientSurgical2 = true;
  }
  openPatientMedications2() {
    this.viewPatientIllness2 = true;
    this.viewPatientDiagnostic2 = true;
    this.viewPatientMedications2 = false;
    this.viewPatientSurgical2 = true;
  }
  openPatientSurgical2() {
    this.viewPatientIllness2 = true;
    this.viewPatientDiagnostic2 = true;
    this.viewPatientMedications2 = true;
    this.viewPatientSurgical2 = false;
  }
}
