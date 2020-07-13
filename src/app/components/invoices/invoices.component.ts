import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

interface SearchByValue {
  viewValue: string;
}

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  signInRes: any;
  signObj: any;
  userID: string;
  patientObj: any;
  addServiceForm: FormGroup;
  viewServiceForm: FormGroup;
  editServiceForm: FormGroup;
  selectPatientForm: FormGroup;
  selectDatesForm: FormGroup;
  editSelectPatientForm: FormGroup;
  editSelectDatesForm: FormGroup;
  selectedRow: any;
  selectedData: any;
  term: any;
  selected = 'All';
  titleArray: any =
    {
      title: "Admin Center",
      subTitle: "Invoices",
      img: "assets/images/ui/Icons/1x/admin center.png"
    };
  patients: any = [];

  loading: boolean;
  indexValue: any;
  subTotalAmount: number = 0;
  editSubTotalAmount: number = 0;
  fetchedSubTotalAmount: number = 0;
  fetchedVat: number = 0;
  fetchedTotalAmount: number = 0;
  totalAmount: number = 0;
  editTotalAmount: number = 0;
  editVat = 0;
  vat: number = 0;
  searchByValue: SearchByValue[] = [
    { viewValue: 'All' },
    { viewValue: 'Draft' },
    { viewValue: 'Paid' },
    { viewValue: 'Unpaid' },
    { viewValue: 'Overdue' }
  ];
  invoicesData: any = [
    { "Invoice": "AB-1001", "Client": "abc babu", "Items": "Urine test", "Amount": "10", "Issuedate": "2020-03-13", "Status": "Draft" },
    { "Invoice": "AB-1002", "Client": "def rani", "Items": "Urine test", "Amount": "20", "Issuedate": "2020-03-14", "Status": "Paid" },
    { "Invoice": "AB-1003", "Client": "ghijil khan rao", "Items": "Urine test", "Amount": "50", "Issuedate": "2020-03-23", "Status": "Unpaid" },
    { "Invoice": "AB-1004", "Client": "jkl vasundhar", "Items": "Urine test", "Amount": "10", "Issuedate": "2020-04-13", "Status": "Overdue" },
    { "Invoice": "AB-1005", "Client": "mno flintoff", "Items": "Urine test", "Amount": "20", "Issuedate": "2020-02-23", "Status": "Paid" },
    { "Invoice": "AB-1006", "Client": "pqr prasuna", "Items": "Urine test", "Amount": "60", "Issuedate": "2020-04-31", "Status": "Draft" },
  ]

  listOfServices: any = [
    { "serviceName": "Urine Test", "cost": "80", "units": "1", "vat": "0", "amount": "80" },
    { "serviceName": "Blood Test", "cost": "90", "units": "1", "vat": "0", "amount": "90" },
    { "serviceName": "Selieva Test", "cost": "60", "units": "1", "vat": "0", "amount": "60" },
    { "serviceName": "Prega Test", "cost": "180", "units": "1", "vat": "0", "amount": "180" },
    { "serviceName": "Eye drop Test", "cost": "40", "units": "1", "vat": "0", "amount": "40" },
  ]


  fetchedListOfServices: any = [
    { "serviceName": "Urine Test", "cost": "80", "units": "1", "vat": "0", "amount": "80" },
    { "serviceName": "Blood Test", "cost": "90", "units": "1", "vat": "0", "amount": "90" },
    { "serviceName": "Eye drop Test", "cost": "40", "units": "1", "vat": "0", "amount": "40" },
  ]
  selectedTest: any;
  closeResult: string;
  constructor(private fb: FormBuilder, private modalService: NgbModal,
    private patientService: PatientService, private loginService: LoginService,
    private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.signInRes = localStorage.getItem("SignInRes");
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
    this.selectedData = this.invoicesData
    this.showData;
    console.log("Invoices Data : ", this.invoicesData);

    this.addServiceForm = this.fb.group({
      serviceHistory: this.fb.array([

      ])
    });
    this.addService();

    this.viewServiceForm = this.fb.group({
      viewServiceHistory: this.fb.array([

      ])
    });

    this.editServiceForm = this.fb.group({
      editServiceHistory: this.fb.array([

      ])
    });

    this.selectPatientForm = this.fb.group({
      patientName: [""],
      emailID: [""],
      phoneNumber: [""],
      address: [""]
    })
    this.editSelectPatientForm = this.fb.group({
      patientName: [""],
      emailID: [""],
      phoneNumber: [""],
      address: [""]
    })

    this.selectDatesForm = this.fb.group({
      invoiceNumber: [""],
      invoiceDate: [""],
      paymentDueDate: [""]
    })
    this.editSelectDatesForm = this.fb.group({
      invoiceDate: [""],
      paymentDueDate: [""]
    })


    this.patchFamilyHistory(this.fetchedListOfServices);
    this.patchFetchedService(this.fetchedListOfServices)
    //this.calculateFetchedTotal();
  }

  callPaymentTransactions() {
    console.log(" called callPaymentTransactions method...");
    //alert("from payment txns ");
    this.router.navigateByUrl('/admincenter/paymentTransactions');
  }

  //Patch Family History
  patchFamilyHistory(fetchedListOfServices) {
    for (let i: number = 0; i <= fetchedListOfServices.length - 1; i++) {
      this.viewServiceData.push(
        this.fb.group({
          serviceName: fetchedListOfServices[i].serviceName,
          cost: fetchedListOfServices[i].cost,
          units: fetchedListOfServices[i].units,
          vat: fetchedListOfServices[i].vat,
          amount: fetchedListOfServices[i].amount
        })
      )
    }
  }

  //Patch Family History
  patchFetchedService(fetchedListOfServices) {
    for (let i: number = 0; i <= fetchedListOfServices.length - 1; i++) {
      this.editServiceData.push(
        this.fb.group({
          serviceName: fetchedListOfServices[i].serviceName,
          cost: fetchedListOfServices[i].cost,
          units: fetchedListOfServices[i].units,
          vat: fetchedListOfServices[i].vat,
          amount: fetchedListOfServices[i].amount
        })
      )
    }
  }

  //Fetch patients data
  getPatientData(obj) {
    this.patientService.getPatientData(obj).subscribe(
      (res) => {
        console.log(res)
        if (res.response === 3) {
          this.loading = false;
          this.patients = res.patients;
          console.log("patients data : ", this.patients);
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

  //get Allergie
  get serviceData() {
    return <FormArray>this.addServiceForm.get('serviceHistory')
  }
  //get Allergie
  get viewServiceData() {
    return <FormArray>this.viewServiceForm.get('viewServiceHistory')
  }
  get editServiceData() {
    return <FormArray>this.editServiceForm.get('editServiceHistory')
  }
  //Add Allergie
  addService() {
    this.serviceData.push(this.fb.group({
      serviceName: [""],
      cost: [""],
      units: [""],
      vat: [""],
      amount: [""]
    }))
  }
  //Add Allergie
  addViewService() {
    this.viewServiceData.push(this.fb.group({
      serviceName: [""],
      cost: [""],
      units: [""],
      vat: [""],
      amount: [""]
    }))
  }
  editViewService() {
    this.editServiceData.push(this.fb.group({
      serviceName: [""],
      cost: [""],
      units: [""],
      vat: [""],
      amount: [""]
    }))
  }
  //Remove Allergie removeService
  removeService(index) {
    this.serviceData.removeAt(index);
    console.log(this.serviceData.value);
  }
  removeService1(index) {
    this.editServiceData.removeAt(index);
    console.log(this.editServiceData.value);
  }

  searchService(term: string) {
    if (!term) {
      this.listOfServices = this.listOfServices;
    } else {
      this.listOfServices = this.listOfServices.filter(x =>
        x.serviceName.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  }

  selectServiceFromList(value: any) {
    this.serviceData.at(this.indexValue).patchValue({
      serviceName: value.serviceName,
      cost: value.cost,
      units: value.units,
      vat: value.vat,
      amount: value.amount
    })
    console.log(value);
    this.subTotalAmount = this.subTotalAmount + parseInt(this.serviceData.at(this.indexValue).value.amount, 10);
    this.totalAmount = this.subTotalAmount + this.vat;
  }

  selectPatientFromList(value: any) {
    console.log(value);
    let index = -1
    index = this.patients.findIndex(val => {
      return val.patientID === value.patientID
    })
    if (index != -1) {
      this.patientObj = this.patients[index]
      console.log("medicalPersonnelObj obj", this.patientObj)
      this.selectPatientForm.patchValue({
        patientName: this.patientObj.firstName + " " + this.patientObj.lastName,
        emailID: this.patientObj.emailID,
        phoneNumber: this.patientObj.phoneNumber.countryCode + " " + this.patientObj.phoneNumber.phoneNumber,
        address: this.patientObj.address
      })

      //this.modalService.close();
      //this.modalService.dismissAll()
    }
  }
  showData(letSearch: string) {
    console.log("Print Value", letSearch);
    if (letSearch == "All") {
      this.term = ""
    } else {
      this.term = letSearch
    }
  }

  searchDoctor(term: string) {
    if (!term) {
      this.patients = this.patients;
    } else {
      this.patients = this.patients.filter(x =>
        x.firstName.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  }

  openCreateInvoiceModal(viewCreateInvoiceContent) {
    this.modalService.open(viewCreateInvoiceContent, { centered: true, size: "lg" })
  }
  //Delete Modal
  openViewModal(viewContent) {
    for (let i = 0; i <= this.fetchedListOfServices.length - 1; i++) {
      console.log(this.fetchedListOfServices[i].amount);

      this.fetchedSubTotalAmount = this.fetchedSubTotalAmount + parseInt(this.fetchedListOfServices[i].amount, 10);
      console.log("the fetched sub total : ", this.fetchedSubTotalAmount);
      this.fetchedTotalAmount = this.fetchedSubTotalAmount + this.fetchedVat;
    }
    this.modalService.open(viewContent, { centered: true, size: "lg" })
  }

  //Delete Modal
  openEditModal(editContent) {
    this.modalService.open(editContent, { centered: true, size: "lg" })
  }

  openSendInvoiceModal(sendInvoiceContent) {
    this.modalService.open(sendInvoiceContent, { centered: true, size: "md" })
  }

  //Delete Modal
  openDeleteModal(deleteContent) {
    this.modalService.open(deleteContent, { centered: true, size: "md" })
  }

  //Delete Modal
  openSendReminderModal(sendReminderContent) {
    this.modalService.open(sendReminderContent, { centered: true, size: "md" })
  }

  //Open ServicesList Model
  openServiceMethod(serviceModel, index) {
    this.indexValue = index;
    console.log("the index value : ", this.indexValue);

    this.modalService.open(serviceModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  calculateAmount() {
    console.log("cost data : ", this.serviceData.at(this.indexValue));

    let calculatedAmount = this.serviceData.at(this.indexValue).value.cost * this.serviceData.at(this.indexValue).value.units;
    console.log("the Amount value is : ", calculatedAmount);
    this.serviceData.at(this.indexValue).patchValue({
      amount: calculatedAmount
    })
    this.subTotalAmount = this.subTotalAmount + parseInt(this.serviceData.at(this.indexValue).value.amount, 10);
    this.totalAmount = this.subTotalAmount + this.vat;

  }
  calculateAmount1() {
    let calculatedAmount = this.serviceData.at(this.indexValue).value.cost * this.serviceData.at(this.indexValue).value.units;
    console.log("the Amount value is : ", calculatedAmount);
    this.serviceData.at(this.indexValue).patchValue({
      amount: calculatedAmount
    })
    this.subTotalAmount = this.subTotalAmount + parseInt(this.serviceData.at(this.indexValue).value.amount, 10);
    this.totalAmount = this.subTotalAmount + this.vat;

  }
  calculateAmount11() {
    console.log("cost data : ", this.editServiceData.at(this.indexValue));

    let calculatedAmount = this.editServiceData.at(this.indexValue).value.cost * this.serviceData.at(this.indexValue).value.units;
    console.log("the Amount value is : ", calculatedAmount);
    this.editServiceData.at(this.indexValue).patchValue({
      amount: calculatedAmount
    })
    this.editSubTotalAmount = this.editSubTotalAmount + parseInt(this.editServiceData.at(this.indexValue).value.amount, 10);
    this.editTotalAmount = this.editSubTotalAmount + this.editVat;

  }
  calculateAmount12() {
    let calculatedAmount = this.editServiceData.at(this.indexValue).value.cost * this.editServiceData.at(this.indexValue).value.units;
    console.log("the Amount value is : ", calculatedAmount);
    this.editServiceData.at(this.indexValue).patchValue({
      amount: calculatedAmount
    })
    this.editSubTotalAmount = this.editSubTotalAmount + parseInt(this.editServiceData.at(this.indexValue).value.amount, 10);
    this.editTotalAmount = this.editSubTotalAmount + this.vat;

  }

  onSearchChange(searchValue: string): void {
    console.log("keyup value height : ", searchValue);
    this.calculateAmount();
  }
  onSearchChange1(searchValue: string): void {
    console.log("keyup value weight : ", searchValue);
    this.calculateAmount1();
  }
  onSearchChange11(searchValue: string): void {
    console.log("keyup value height : ", searchValue);
    this.calculateAmount();
  }
  onSearchChange12(searchValue: string): void {
    console.log("keyup value weight : ", searchValue);
    this.calculateAmount1();
  }

  addInvoiceSubmit() {
    //this.isLoading = true;
    let payLoad = this.addServiceForm.value.serviceHistory;
    let serviceHistoryArray: any[] = [];
    for (let i: number = 0; i <= payLoad.length - 1; i++) {
      serviceHistoryArray.push(
        {
          "serviceName": payLoad[i].serviceName,
          "cost": payLoad[i].cost,
          "units": payLoad[i].units,
          "vat": payLoad[i].vat,
          "amount": payLoad[i].amount
        }
      )
    }
    let payLoad2 = this.selectPatientForm.value;
    console.log("serviceHistoryArray data from form : ", serviceHistoryArray, payLoad2);
    let ngbDate = this.selectDatesForm.controls['invoiceDate'].value;
    let myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    var dateAr = myDate.toLocaleDateString().split('/');
    var newDate = dateAr[2] + '/' + dateAr[0] + '/' + dateAr[1];
    var invoiceDate = new Date(newDate).getTime() / 1000;
    let ngbDate1 = this.selectDatesForm.controls['paymentDueDate'].value;
    let myDate1 = new Date(ngbDate1.year, ngbDate1.month - 1, ngbDate1.day);
    var dateAr1 = myDate1.toLocaleDateString().split('/');
    var newDate1 = dateAr1[2] + '/' + dateAr1[0] + '/' + dateAr1[1];
    var paymentDueDate = new Date(newDate1).getTime() / 1000;

    console.log("invoice date is : ", invoiceDate, paymentDueDate);
    console.log("total amount is : ", this.subTotalAmount);

    let addIllnessObj = {
      "byWhom":"admin",
      "byWhomID": this.signObj.hospitalAdmin.userID,
      "invoiceNumber": this.selectDatesForm.value.invoiceNumber,
      "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num,
      "invoiceIssueDate": invoiceDate,
      "invoicePaymentDueDate": paymentDueDate,
      "subTotal": this.subTotalAmount,
      "VAT": this.vat,
      "totalAmount": this.totalAmount,
      "isSavedInDraft":false,
      "paymentStatus":"unpaid",
      "clientDetails":{
        "name" : this.patientObj.firstName,
         "phoneNumber":{
           "countryCode": this.patientObj.phoneNumber.countryCode,
           "phoneNumber": this.patientObj.phoneNumber.phoneNumber
         },
         "emailID": this.patientObj.emailID,
         "address": this.patientObj.address
      },
      "serviceItems": serviceHistoryArray
  }
    console.log("the req for add invoice data obj : ", addIllnessObj);
    // this.loginService.addInvoiceData(addIllnessObj, this.signObj.access_token).
    //   subscribe(
    //     (res) => {
    //       console.log("res from add invoice  : ", res)
    //       if (res.response === 3) {
    //         this.loading = false;
           
    //       }
    //       else if (res.response === 0) {
    //         this.loading = false;
    //       }
    //     },
    //     (err: HttpErrorResponse) => {
    //       if (err.error instanceof Error) {
    //         this.loading = false;
    //         console.log("Client Side Error")
    //       } else {
    //         this.loading = false;
    //         console.log(err)
    //       }
    //     })
  }


  //Open PatientsList Model
  openPatientMethod(patientsModel) {
    this.modalService.open(patientsModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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

  deleteProject() {

  }

  onTabChange($event) {

  }
  closeView() {

  }

  addRow() {

  }
}
