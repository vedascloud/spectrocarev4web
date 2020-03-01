import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'spectrocarev4web';
  Show:boolean = false;
  constructor(private router:Router){}
  isValid():Boolean{
    if((this.router.url !="/") && 
       (this.router.url !="/adminsignin" )&&
       (this.router.url !="/adminsignup") &&
       (this.router.url !="/medicalpersonnelsignup") && 
       //(this.router.url != "/admincenter/dashboard")&&
       //(this.router.url !="/admincenter/home") &&
       
    //(this.router.url != "/admincenter/adminprofile")&&
    (this.router.url != "/patient")&&
    (this.router.url != "/adminappointment")&&
    //(this.router.url != "/admincenter/report")&&
       (this.router.url != "/forgot") &&
       (this.router.url !="/termsandconditions") && 
       (this.router.url != "/privacypolicy") &&
       (this.router.url != "/changepassword")  &&
       (this.router.url != "/headerone") &&
       (this.router.url != "/administrator") && 
       (this.router.url != "/medicalpersonnel") &&
       (this.router.url != "/patientmodule") 
       
      ){
      return true
    }
      return false;
  }

  isTrue():Boolean{
    if ( (this.router.url !="/") && 
    (this.router.url !="/adminsignin" )&&
    (this.router.url !="/adminsignup") &&
    (this.router.url != "/medicalpersonnelsignup") &&
    (this.router.url != "/header") &&
    (this.router.url != "/admincenter/dashboard")&&
    (this.router.url !="/admincenter/home") &&
    (this.router.url != "/admincenter/adminprofile")&&
    (this.router.url !="/admincenter/manageuser") &&
    (this.router.url != "/admincenter/billandpayment") &&
    (this.router.url != "/admincenter/patient") &&
    (this.router.url != "/admincenter/allmedicalrecord") &&
    (this.router.url != "/patient")&&
    (this.router.url != "/adminappointment")&&
    (this.router.url !="/admincenter/upcomingappointment") &&
    (this.router.url != "/admincenter/pastappointment") &&
    (this.router.url != "/admincenter/bookappointment") &&
    (this.router.url != "/admincenter/appointmentcalendar") &&
    (this.router.url != "/admincenter/report")&&
    (this.router.url != "/forgot") &&
    (this.router.url !="/termsandconditions") && 
    (this.router.url != "/privacypolicy") ) {
      return true;
    }
    return false;
  }

  
}
