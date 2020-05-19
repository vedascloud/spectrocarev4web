import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';

interface SearchByValue { 
  viewValue: string;
}

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  term:any;
  selected = 'All';
  titleArray:any =
  {title:"Appointment",
  subTitle:"",
img:"assets/images/ui/Icons/1x/calendar1.png"};

signInRes: any;
signObj: any;
userID: string;
previewImg: any;
loading: boolean;
listOfAppointments: any = [];
allAppointments: any = [];
currentDate: any;
pastAppointments: any = [];
upcomingAppointments: any = [];
todayAppointments: any = [];
listSize:any;
searchByValue: SearchByValue[] = [
  { viewValue: 'All'},
  { viewValue: 'Waiting for confirmation'},
  { viewValue: 'Cancelled'},
  { viewValue: 'Accepted'},
  { viewValue: 'Online'},
  { viewValue: 'Onsite'}
];

invoicesData : any = [
  {"Invoice":"AB-1001","Client":"abc babu","Items":"Urine test","Amount":"10","Issuedate":"2020-03-13","Status":"Draft"},
  {"Invoice":"AB-1002","Client":"def rani","Items":"Urine test","Amount":"20","Issuedate":"2020-03-14","Status":"Paid"},
  {"Invoice":"AB-1003","Client":"ghijil khan rao","Items":"Urine test","Amount":"50","Issuedate":"2020-03-23","Status":"Unpaid"},
  {"Invoice":"AB-1004","Client":"jkl vasundhar","Items":"Urine test","Amount":"10","Issuedate":"2020-04-13","Status":"Overdue"},
  {"Invoice":"AB-1005","Client":"mno flintoff","Items":"Urine test","Amount":"20","Issuedate":"2020-02-23","Status":"Paid"},
  {"Invoice":"AB-1006","Client":"pqr prasuna","Items":"Urine test","Amount":"60","Issuedate":"2020-04-31","Status":"Draft"},
]
constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.showData;
    console.log("Invoices Data : ",this.invoicesData);

    
    this.signInRes = localStorage.getItem("SignInRes");
    this.previewImg = "/assets/images/smile.jpg";
    if (this.signInRes) {
      this.signObj = JSON.parse(this.signInRes);
      this.userID = localStorage.getItem('userID');

      let getHospitalAppointmentsDataObj = {
        "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num,
        "adminUserID": this.signObj.hospitalAdmin.userID
      }
      this.loading = true;
      this.getHospitalAppointmentsData(getHospitalAppointmentsDataObj)
    }
  }
   showData(letSearch:string){
     console.log("Print Value",letSearch);
     if(letSearch == "All"){
       this.term = ""
     }else{
       this.term = letSearch
     }
   } 
  
   getHospitalAppointmentsData(obj) {
    this.loginService.getHospitalAppointmentsData(obj,this.signObj.access_token).subscribe(
      (res) => {
        console.log(res)
        if (res.response === 3) {
          this.loading = false;
          this.listOfAppointments = res.appointments;
          this.allAppointments = res.appointments;
          let count:any [] = this.listOfAppointments;
          this.listSize = count.length;
          console.log("Hospital/Admin having num of Appointments size is : ",this.listSize);
          console.log("Appointments Data : ",this.listOfAppointments);         

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

  getPastAppointments(){
    console.log("past appointments called");
    
    this.currentDate = new Date().toLocaleDateString()
    //let allAppointments = this.listOfAppointments;
    this.listOfAppointments = this.allAppointments.filter(date=>{
    return new Date(date.appointmentDate).toLocaleDateString() < this.currentDate
  })
}

getUpcomingAppointments(){
  console.log("upcoming appointments called");
    
    this.currentDate = new Date().toLocaleDateString()

    this.listOfAppointments = this.allAppointments.filter(date=>{
    return new Date(date.appointmentDate).toLocaleDateString() > this.currentDate
  })
}

getTodayAppointments(){
  console.log("today appointments called");
    
    this.currentDate = new Date().toLocaleDateString()

    this.listOfAppointments = this.allAppointments.filter(date=>{
    return new Date(date.appointmentDate).toLocaleDateString() == this.currentDate
  })
}

}
