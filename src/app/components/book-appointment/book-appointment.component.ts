import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { NgbDatepickerConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  bookAppointmentForm: FormGroup;
  selectedRow: any;
  signInRes: any;
  signObj: any;
  userID: string;
  visitType: string;
  closeResult: string;
  patientsList: any = [];
  filteredPatients: any = [];
  medicalPersonnels: any = [];
  filteredMedicalPersonnels: any = [];
  titleArray: any =
    {
      title: "Appointment",
      subTitle: "Book Appointment",
      img: "assets/images/ui/Icons/1x/calendar1.png"
    };

    
  color: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  textColor: string;
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
  textColor5: string;

  constructor(private router: Router, private modalService: NgbModal, private loginService: LoginService, 
    private fb: FormBuilder, private config: NgbDatepickerConfig, private _snackBar: MatSnackBar, 
    private atp: AmazingTimePickerService) {
    const current = new Date()
    config.minDate = { year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate() }
  }

  ngOnInit() {
    this.signInRes = localStorage.getItem("SignInRes");
    if (this.signInRes) {
      this.signObj = JSON.parse(this.signInRes);
      this.userID = localStorage.getItem('userID');

      this.bookAppointmentForm = this.fb.group({
        hospital_reg_num: [""],
        appointmentDate: [""],
        appointmentTimeFrom: [""],
        appointmentTimeTo: [""],
        visitType: [""],
        reasonForVisit: [""],
        doctorName: [""],
        doctorMedicalPersonnelID: [""],
        patientName: [""],
        emailID: [""],
        phoneNumber: [""],
        patientID: [""],
        creatorName: [""],
        createrMedicalPersonnelID: [""],
        medicalRecordID: [""],
        department: [""],
      });

      let objForFetchPatients = {
        "userID": this.userID,
        "category": "All",
        "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num,
        "token": this.signObj.access_token
      }
      this.getPatientData(objForFetchPatients);

      let medicalObj = {
        "userID": this.userID,
        "category": "All",
        "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num,
        "token": this.signObj.access_token
      }
      this.getDoctorData(medicalObj);

    }
    this.viewOnline();
    

    this.autoAddAppointmentData(this.signObj);
  }

  getPatientData(obj) {
    this.loginService.getPatientData(obj).subscribe(
      (res) => {
        console.log(res)
        if (res.response === 3) {

          this.patientsList = res.patients;
          this.filteredPatients = res.patients;
          console.log("list of patients : ", this.patientsList);

        } else {
          alert(res.message);
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {

          console.log("Client Side Error")
        } else {

          console.log(err)
        }
      })
  }

  viewOnline() {
    this.textColor = 'white';
    this.textColor1 = 'black';
    this.color = '#53B9C6';
    this.color1 = 'white';
    this.visitType = "online";
  }

  viewOnsite() {
    this.textColor = 'black';
    this.textColor1 = 'white';
    this.color = 'white'
    this.color1 = '#53B9C6';
    this.visitType = "onsite";
  }

  book1(){
    this.textColor2 = 'white';
    this.color2 = '#53B9C6';
    this.textColor3 = 'black';
    this.textColor4 = 'black';
    this.textColor5 = 'black';
    this.color3 = 'white'
    this.color4 = 'white'
    this.color5 = 'white'
    this.bookAppointmentForm.patchValue({
      appointmentTimeFrom:"9:00 AM"
    })
  }
  book2(){
    this.textColor3 = 'white';
    this.color3 = '#53B9C6';
    this.textColor2 = 'black';
    this.textColor4 = 'black';
    this.textColor5 = 'black';
    this.color2 = 'white'
    this.color4 = 'white'
    this.color5 = 'white'
    this.bookAppointmentForm.patchValue({
      appointmentTimeFrom:"9:30 AM"
    })
  }
  book3(){
    this.textColor4 = 'white';
    this.color4 = '#53B9C6';
    this.textColor2 = 'black';
    this.textColor3 = 'black';
    this.textColor5 = 'black';
    this.color3 = 'white'
    this.color2 = 'white'
    this.color5 = 'white'
    this.bookAppointmentForm.patchValue({
      appointmentTimeFrom:"10:00 AM"
    })
  }
  book4(){
    this.textColor5 = 'white';
    this.color5 = '#53B9C6';
    this.textColor2 = 'black';
    this.textColor3 = 'black';
    this.textColor4 = 'black';
    this.color3 = 'white'
    this.color4 = 'white'
    this.color2 = 'white'
    this.bookAppointmentForm.patchValue({
      appointmentTimeFrom:"11:00 AM"
    })
  }


  checkValue(value: any) {
    console.log(value.target.value);
    let index = -1
    index = this.patientsList.findIndex(val => {
      return val.patientID === value.target.value
    })
    if (index != -1) {
      let obj = this.patientsList[index]
      console.log("obj", obj)
      this.bookAppointmentForm.patchValue({
        patientName: obj.firstName,
        medicalRecordID: obj.medical_record_id
      })
    }
  }

  autoAddAppointmentData(data) {
    this.bookAppointmentForm.patchValue({
      hospital_reg_num: data.hospitalAdmin.hospital_reg_num,
      creatorName: data.hospitalAdmin.firstName,
      createrMedicalPersonnelID: data.hospitalAdmin.userID
    })
  }

  getDoctorData(medicalObj) {
    this.loginService.getMedicalPatientData(medicalObj).subscribe(
      (res) => {
        console.log(res)
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

  checkDoctorValue(value: any) {
    console.log(value.target.value);
    let index = -1
    index = this.medicalPersonnels.findIndex(val => {
      return val.medical_personnel_id === value.target.value
    })
    if (index != -1) {
      let obj = this.medicalPersonnels[index]
      console.log("obj", obj);
      this.bookAppointmentForm.patchValue({
        doctorName: obj.firstName,
        doctorMedicalPersonnelID: obj.medical_personnel_id,
        department: obj.department
      })
    }
  }

  clearForm(){
    this.bookAppointmentForm.reset();
  }

  bookAppointment() {

    let ngbDate = this.bookAppointmentForm.controls['appointmentDate'].value;
    let myDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    console.log("date mydate", myDate);

    this.bookAppointmentForm.patchValue({ 
      appointmentDate: myDate.toLocaleDateString() ,
      visitType: this.visitType,
      appointmentTimeTo: this.bookAppointmentForm.value.appointmentTimeTo
    })
    console.log("sended date format : ", myDate.toLocaleDateString().split("/").reverse().join("/"));
    var dateAr = myDate.toLocaleDateString().split('/');
    var newDate = dateAr[2] + '/' + dateAr[0] + '/' + dateAr[1];
    
    let payLoad = this.bookAppointmentForm.value;
    delete payLoad.emailID;
    delete payLoad.phoneNumber;
    console.log("new date yyyy/mm/dd to assign form : ", newDate);
    console.log("req data to book appointment : ", payLoad);

    this.loginService.bookAppointmentService(payLoad, this.signObj.access_token).subscribe(
      (bookAppointmentRes) => {
        console.log(bookAppointmentRes);

        if (bookAppointmentRes.response === 3) {
          this.router.navigateByUrl("admincenter/appointmentlist");
          alert(bookAppointmentRes.message);
        }
        else {
          alert(bookAppointmentRes.message);
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {

          console.log("Client Side Error", err);

        } else {

          console.log("Server Side", err);
        }
      }
    );
  }

  //Open PatientList Model
  openPatientModel(content1, patientsList) {
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  //Open DoctorsList Model
  openDoctorModel(content2) {
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title', centered: true, size: "md" }).result.then((result) => {
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

  selectPatientFromList(value: any) {
    console.log(value);
    let index = -1
    index = this.patientsList.findIndex(val => {
      return val.patientID === value.patientID
    })
    if (index != -1) {
      let obj = this.patientsList[index]
      console.log("obj", obj)
      this.bookAppointmentForm.patchValue({
        patientID: obj.patientID,
        patientName: obj.firstName + " " + obj.lastName,
        medicalRecordID: obj.medical_record_id,
        emailID: obj.emailID,
        phoneNumber: obj.phoneNumber.countryCode + " " +obj.phoneNumber.phoneNumber
      })
      this.modalService.dismissAll()
    }
  }

  search(term: string) {
    console.log("term", term)
    if (!term) {
      this.filteredPatients = this.patientsList;
    } else {
      this.filteredPatients = this.patientsList.filter(x =>
        x.firstName.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  }

  selectDoctorFromList(value: any) {
    console.log(value);
    let index = -1
    index = this.medicalPersonnels.findIndex(val => {      
      return val.profile.userProfile.medical_personnel_id === value.profile.userProfile.medical_personnel_id
    })
    console.log("index value : ",index);
    if (index != -1) {
      let obj = this.medicalPersonnels[index]
      console.log("obj", obj)
      this.bookAppointmentForm.patchValue({
        doctorName: obj.profile.userProfile.firstName + " " + obj.profile.userProfile.lastName,
        doctorMedicalPersonnelID: obj.profile.userProfile.medical_personnel_id,
        department: obj.profile.userProfile.department
      })
      this.modalService.dismissAll()
    }
  }

  searchDoctor(term: string) {
    console.log("term", term)
    if (!term) {
      this.filteredMedicalPersonnels = this.medicalPersonnels;
    } else {
      this.filteredMedicalPersonnels = this.medicalPersonnels.filter(x =>
        x.firstName.trim().toLowerCase().includes(term.trim().toLowerCase())
      );
    }
  }

  open(event: any) {
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
      var d = new Date();
      var amOrPm = (d.getHours() < 12) ? "AM" : "PM";
      var hour = (d.getHours() < 12) ? d.getHours() : d.getHours() - 12;
      console.log("time to am/pm : ", d.getDate() + ' / ' + d.getMonth() + ' / ' + d.getFullYear() + ' ' + hour + ':' + d.getMinutes() + ' ' + amOrPm);

      return d.getDate() + ' / ' + d.getMonth() + ' / ' + d.getFullYear() + ' ' + hour + ':' + d.getMinutes() + ' ' + amOrPm;
    });
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
    if (type === "from") {
      this.bookAppointmentForm.patchValue({ appointmentTimeFrom: time12 })
    }
    else {
      this.bookAppointmentForm.patchValue({ appointmentTimeTo: time12 })
    }
    return time12;
  }
  onTimeClick() {
    let type = "to"
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
      this.convertTime24to12(time, type)
    });
  }
  onClick() {
    let type = "from"
    const amazingTimePicker = this.atp.open();
    amazingTimePicker.afterClose().subscribe(time => {
      console.log(time);
      this.convertTime24to12(time, type)
    });
  }

}
