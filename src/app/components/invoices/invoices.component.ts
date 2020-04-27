import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface SearchByValue {
  
  viewValue: string;
}

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  selectedData:any;
  term:any;
  selected = 'All';
  titleArray:any =
  {title:"Admin Center",
  subTitle:"Invoices",
img:"assets/images/ui/Icons/1x/admin center.png"};

searchByValue: SearchByValue[] = [
  { viewValue: 'All'},
  { viewValue: 'Draft'},
  { viewValue: 'Paid'},
  { viewValue: 'Unpaid'},
  { viewValue: 'Overdue'}
];


invoicesData : any = [
  {"Invoice":"AB-1001","Client":"abc babu","Items":"Urine test","Amount":"10","Issuedate":"2020-03-13","Status":"Draft"},
  {"Invoice":"AB-1002","Client":"def rani","Items":"Urine test","Amount":"20","Issuedate":"2020-03-14","Status":"Paid"},
  {"Invoice":"AB-1003","Client":"ghijil khan rao","Items":"Urine test","Amount":"50","Issuedate":"2020-03-23","Status":"Unpaid"},
  {"Invoice":"AB-1004","Client":"jkl vasundhar","Items":"Urine test","Amount":"10","Issuedate":"2020-04-13","Status":"Overdue"},
  {"Invoice":"AB-1005","Client":"mno flintoff","Items":"Urine test","Amount":"20","Issuedate":"2020-02-23","Status":"Paid"},
  {"Invoice":"AB-1006","Client":"pqr prasuna","Items":"Urine test","Amount":"60","Issuedate":"2020-04-31","Status":"Draft"},
]

  constructor( private modalService: NgbModal) { }

  ngOnInit() {
    this.selectedData = this.invoicesData
   this.showData;
   console.log("Invoices Data : ",this.invoicesData);
   
  }

  showData(letSearch:string){
    console.log("Print Value",letSearch);
    if(letSearch == "All"){
      this.term = ""
    }else{
      this.term = letSearch
    }
  }  

  openCreateInvoiceModal(viewCreateInvoiceContent){
    this.modalService.open(viewCreateInvoiceContent, { centered: true, size: "lg" })
  }
   //Delete Modal
   openViewModal(viewContent) {
    this.modalService.open(viewContent, { centered: true, size: "md" })
    }

     //Delete Modal
     openEditModal(editContent) {
    this.modalService.open(editContent, { centered: true, size: "md" })
    }

    openSendInvoiceModal(sendInvoiceContent){
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
    deleteProject(){

    }

    onTabChange($event){

    }
    closeView(){

    }

    addRow(){

    }
}
