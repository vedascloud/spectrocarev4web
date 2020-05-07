import { Component, OnInit } from '@angular/core';
import { PatientProfileComponent } from '../patient-profile/patient-profile.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
interface SearchByValue {

  viewValue: string;
}
@Component({
  selector: 'app-patient-appointment-record',
  templateUrl: './patient-appointment-record.component.html',
  styleUrls: ['./patient-appointment-record.component.css']
})
export class PatientAppointmentRecordComponent implements OnInit {

  loading: boolean;  
  patientAppointmentsData: any;
  
  closeResult: string;
  
  selected = 'All';
  searchByValue: SearchByValue[] = [
    { viewValue: 'All' }
  ];

  constructor(private patientProfile:PatientProfileComponent,private modalService: NgbModal,) { }

  ngOnInit() {
    this.patientAppointmentsData = this.patientProfile.patientAppointmentsData;
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

  openViewMethod(viewModel) {
    this.modalService.open(viewModel, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  showData(event){

  }
}
