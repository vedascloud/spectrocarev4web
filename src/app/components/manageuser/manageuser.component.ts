import { Component, OnInit ,ViewChild, ElementRef} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder ,Validators, AbstractControl} from '@angular/forms';
import { MatSnackBar ,MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
  addAdminGenUserForm: FormGroup;
  adminGeneralUserProfileForm:FormGroup;
  changePasswordForm:FormGroup;
  closeResult: string;
  signInRes: any;
  signObj: any;
  userID: string;
  loading:boolean;
  adminData: any = localStorage.getItem("SignInRes");
  adminData1: any = JSON.parse(this.adminData);

  adminTeam: any = [];
  adminTeamData: any = [];
  medicalPersonnels: any = [];
  checkAdministrator:string;
  isAdminSystmMngr:boolean =false;
  isAdminAdd:boolean = true;
  isViewAdmin:boolean = true;
  disableUpdateBtn:boolean = false;
  isPassword: boolean = true;
  isAdminUser: boolean = true;
  isMedicalUser: boolean = false;
  password: string = "password";
  term:any;

   //show date
  n =  new Date();
  y = this.n.getFullYear();
  m = this.n.getMonth() + 1;
  d = this.n.getDate();
  presentDate = this.m + "/" + this.d + "/" + this.y;

  countryCodes = [
    { value: '+91', viewValue: '+91' },
    { value: '+886', viewValue: '+886' },
    { value: '+60', viewValue: '+60' }
  ];

  departments = [
    { value: 'Pharmacy', viewValue: 'Pharmacy' },
    { value: 'Admissions', viewValue: 'Admissions' },
    { value: 'Cardiology', viewValue: 'Cardiology' },
    { value: 'Administrative', viewValue: 'Administrative'},
    { value: 'Medical', viewValue: 'Medical'},
    { value: 'Paramedical', viewValue: 'Paramedical'},
    { value: 'Receptionist', viewValue: 'Receptionist'}
  ];

  identitys = [
    { value: 'Administrator System Manager', viewValue: 'Administrator System Manager'},
    { value: 'Administrator General', viewValue: 'Administrator General'}
  ];

  preferLanguages = [
    { value: 'English', viewValue: 'English' },
    { value: 'Chinese', viewValue: 'Chinese' },
    { value: 'French', viewValue: 'French' },
    { value: 'Taipe', viewValue: 'Taipe'}
  ];

  @ViewChild('autoFocusTest',{static:false}) nativeEl:ElementRef;

  constructor(private router:Router,private loginService: LoginService, private modalService: NgbModal, private fb: FormBuilder,private _snackBar: MatSnackBar) { }

  ngOnInit() {

    this.checkAdministrator = localStorage.getItem("AdministratorSystemManager");
    console.log("admin stm mgr : ",this.checkAdministrator);
    this.loading = true;

    //let adminData2 = JSON.parse(this.adminData);
    console.log("admin data : ", this.adminData1);

    this.signInRes = localStorage.getItem("SignInRes");
    if (this.signInRes) {
      this.signObj = JSON.parse(this.signInRes);
      this.userID = localStorage.getItem('userID');
      
      //this.fetchMedicalPersonsData();
      this.fetchAdminGenralData();
     
     
    }

    this.addAdminGenUserForm = this.fb.group({
      adminManagerUserID:[""],
      userID:["",[Validators.required]],
      hospital_reg_num:["",Validators.required],
      password:["",Validators.required],
      confirmpassword:['',Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      emailID:["",Validators.required],
      preferLanguage:["",Validators.required],
      department:["",Validators.required],
      // identity:[""],
      phoneNumber: this.fb.group({
        countryCode:['',Validators.required],
        phoneNumber:['',Validators.required],
      })
    },
    {
      validators:this.checkPasswords
    });
    //this.addAdminGenUserForm.disable();
    this.autoAddAdminGenUserData(this.signObj);
    //this.autoAddAdminGenUserData(this.adminTeam);

    this.adminGeneralUserProfileForm = this.fb.group({
      userID:[""],
      verificationStatus:[""],
      identity:[""],
      preferLanguage:[""],
      hospital_reg_num:[""],
      registerTime:[""],
      firstName:[""],
      lastName:[""],
      emailID:[""],
      department:[""],
      phoneNumber: this.fb.group({
        countryCode:[''],
        phoneNumber:[''],
      })
    });

    this.adminGeneralUserProfileForm.disable();

    //Giving Access Controls to AdministratorSystemManager & AdministratorGeneral
    if(this.checkAdministrator === "3"){
      this.isAdminSystmMngr = true; 
      //this.addAdminGenUserForm.enable()
    }
    else{
      this.isAdminSystmMngr = false;
      //this.addAdminGenUserForm.disable()
      
    }

     //Change Pwd
     this.changePasswordForm =this.fb.group({
      "userID":["",[Validators.required,Validators.email]],
      "oldPassword":['',[Validators.required,Validators.minLength(8)]],
      "newPassword":['',[Validators.required,Validators.minLength(8)]]
    })

  }

   //Mat Snack Bar
   openSnackBar(message:string,action:string){
    this._snackBar.open(message,action,{duration:5000})
  }

  checkPasswords(c:AbstractControl):{invalid:boolean}{
    if (c.get('password').value !== c.get('confirmpassword').value) {
      return {invalid: true};
    }
  }

  showPassword() {
    if (this.isPassword === true) {
      this.password = "text";
      this.isPassword = false;
    } else {
      this.password = "password"
      this.isPassword = true;
    }
  }

  //Fetch Admin Gen Data
  fetchAdminGenralData(){
    let regAdminWithGenUserData = {
      "adminUserID":this.userID
      //"adminManagerUserID":this.userID
    }

    //Get Admin-data & Admin-general-user-data
    this.loginService.getAdminWithGenUserData(regAdminWithGenUserData,this.signObj.access_token).subscribe(
      (resAdminWithGenUserData)=>{
        console.log("Req For Fetching Admin Gen User Data : ",regAdminWithGenUserData);
        console.log("the admin and team data : ",resAdminWithGenUserData);

        if(resAdminWithGenUserData.response === 3){
          this.loading= false;
          this.adminTeam = resAdminWithGenUserData.adminusers;
          this.adminTeamData = resAdminWithGenUserData.adminusers;
          console.log("admin team data : ",this.adminTeam);
          //alert(resAdminWithGenUserData.message);
        }
        else{
          this.loading= false;
          //alert(resAdminWithGenUserData.message);
        }

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.loading= false;
          console.log("Client Side Error")
        } else {
          this.loading= false;
          console.log(err)
        }
      }
    );
  }
  //Tab Change Event
  onTabChange(event){
    console.log("event",event)
    this.isViewAdmin = true;
  }
  //Add Admin Gen Data
  addAdminGenUserSubmit(){
    console.log(this.signObj.access_token);
    console.log(this.addAdminGenUserForm.value);
    let payLoad = this.addAdminGenUserForm.value
    delete payLoad.confirmpassword
    console.log("payload",payLoad)
    
    this.loginService.addAdminGenUser(this.addAdminGenUserForm.value, this.signObj.access_token).subscribe(
      (addAdminGenUserRes)=>{
        console.log(addAdminGenUserRes);
        
        if(addAdminGenUserRes.response === 3){
          alert(addAdminGenUserRes.message);
          this.openSnackBar(addAdminGenUserRes.message,"");
          this.loading= false;
          this.modalService.dismissAll();
          this.addAdminGenUserForm.reset();
          this.fetchAdminGenralData();
        }
        else{
          this.openSnackBar(addAdminGenUserRes.message,"");
          alert(addAdminGenUserRes.message);
        }
      },
      (err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          this.loading= false;
          console.log("Client Side Error",err);
          
        }else{
          this.loading= false;
          console.log("Server Side",err)
        }
      }
    );
  }

  //Auto Add Admin General User Data
  autoAddAdminGenUserData(hospitalData){
    this.addAdminGenUserForm.patchValue({
      hospital_reg_num:hospitalData.hospitalInformation.hospital_reg_num,
      adminManagerUserID:hospitalData.hospitalAdmin.userID
    })
  }
  

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',centered:true,size:'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  

  //Open Update Admin Model
  openUpdateModel(content2, selectedAdmin) {
    console.log(selectedAdmin);
    this.adminGeneralUserProfileForm.patchValue({
      userID:selectedAdmin.userID,
       verificationStatus:selectedAdmin.verificationStatus,
       identity:selectedAdmin.identity,
       preferLanguage:selectedAdmin.preferLanguage,
       hospital_reg_num:selectedAdmin.hospital_reg_num,
       registerTime:selectedAdmin.registerTime,
       firstName:selectedAdmin.firstName,
       lastName:selectedAdmin.lastName,
       emailID:selectedAdmin.emailID,
       department:selectedAdmin.department,
       phoneNumber:{
        phoneNumber:selectedAdmin.phoneNumber.phoneNumber,
        countryCode:selectedAdmin.phoneNumber.countryCode
      }
    });
    this.modalService.open(content2, { ariaLabelledBy: 'modal-basic-title',centered:true, size:'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openViewOne(adminTeam){
    console.log("Selected Admin User To View Data : ",adminTeam);
    this.adminGeneralUserProfileForm.patchValue({
      userID:adminTeam.userID,
       verificationStatus:adminTeam.verificationStatus,
       identity:adminTeam.identity,
       preferLanguage:adminTeam.preferLanguage,
       hospital_reg_num:adminTeam.hospital_reg_num,
       registerTime:adminTeam.registerTime,
       firstName:adminTeam.firstName,
       lastName:adminTeam.lastName,
       emailID:adminTeam.emailID,
       department:adminTeam.department,
       phoneNumber:{
        phoneNumber:adminTeam.phoneNumber.phoneNumber,
        countryCode:adminTeam.phoneNumber.countryCode
      }
    });
    this.openView()
  }

  //update Admin Gen Data
  updateAdminGenUserSubmit(){
    console.log(this.signObj.access_token);
    console.log(this.adminGeneralUserProfileForm.value);

    this.loginService.updateAdminGenUser(this.adminGeneralUserProfileForm.value, this.signObj.access_token).subscribe(
      (updateAdminGenUserRes)=>{
        console.log(updateAdminGenUserRes);
        
        if(updateAdminGenUserRes.response === 3){
          this.openSnackBar(updateAdminGenUserRes.message,"");
          this.loading= false;
          this.modalService.dismissAll();
          this.adminGeneralUserProfileForm.reset();
          this.fetchAdminGenralData();
        }
        else{
          this.openSnackBar(updateAdminGenUserRes.message,"");
          alert(updateAdminGenUserRes.message);
        }
      },
      (err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          this.loading= false;
          console.log("Client Side Error",err);
          
        }else{
          this.loading= false;
          console.log("Server Side",err)
        }
      }
    );
  }

    //Delete Modal
    openDeleteModal(content1) {
    this.modalService.open(content1, { centered: true, size: "md" })
    }
    deleteProject(clientObj) {
      console.log("Admin Gen User Data to delete : ",clientObj)
      let delObj = {
        "adminManagerUserID":this.signObj.hospitalAdmin.emailID,
        "adminUserIDToDelete":clientObj.userID
      }

      this.loginService.deleteAdminGenUser(delObj,this.signObj.access_token).subscribe((deleteAdminGenres)=>{
        console.log("delete admin gen data res : ",deleteAdminGenres);
        if(deleteAdminGenres.response === 3){
          this.openSnackBar(deleteAdminGenres.message,"");
          this.modalService.dismissAll();
          this.fetchAdminGenralData();
          //alert(deleteAdminGenres.message);
        }
        else{
          this.openSnackBar(deleteAdminGenres.message,"");
          this.modalService.dismissAll();
          alert(deleteAdminGenres.message);
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.loading = false;
          console.log("Client Side Error")
        } else {
          this.loading = false;
          console.log(err)
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

  // openUpdate(){
  //   if (this.disableUpdateBtn === false) {
  //     this.disableUpdateBtn = true;
  //     this.addAdminGenUserForm.enable();
  //   }
  //   else{
  //     this.disableUpdateBtn = false;
  //   }
  // }

  open4(content4) {
    this.modalService.open(content4, { ariaLabelledBy: 'modal-basic-title',centered:true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.changePasswordForm.reset();
    });
  }
   //Add Change Pwd Data
   changePwdSubmit(){
    //console.log(this.signObj.access_token);
    console.log("Change Pwd Req : ",this.changePasswordForm.value);

    this.loginService.changePassword(this.changePasswordForm.value).subscribe(
      (changePwdRes)=>{
        console.log("Change Pwd Response : ",changePwdRes);
        
        if(changePwdRes.response === 3){
          this.router.navigateByUrl('/adminprofile')
          //this.loading= false;
          this.modalService.dismissAll();
          this.changePasswordForm.reset();
          //this.fetchAdminGenralData();
          this.openSnackBar(changePwdRes.message,"");
        }
        else{
          this.openSnackBar(changePwdRes.message,"");
          alert(changePwdRes.message);
        }
      },
      (err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          this.loading= false;
          console.log("Client Side Error",err);
          
        }else{
          this.loading= false;
          console.log("Server Side",err)
        }
      }
    );
  }

 

  openAddNew(){
    this.isAdminAdd = false;
    this.nativeEl.nativeElement.focus();
  }
  closeAddNew(){
    this.isAdminAdd = true;
  }

  openView(){
    this.isViewAdmin = false;
    //this.addAdminGenUserForm.enable();
    //this.disableUpdateBtn = true;
    this.adminGeneralUserProfileForm.disable();
    //this.nativeEl.nativeElement.focus();
  }
  closeView(){
    this.isViewAdmin = true;
    this.disableUpdateBtn = false;
  }

  openUpdate(){
    if (this.disableUpdateBtn === false) {
      this.disableUpdateBtn = true;
      this.adminGeneralUserProfileForm.enable();
      
      this.nativeEl.nativeElement.focus()
      
      //this.homeForm.value.hospitalName.value.focus();
    }
    else{
      //this.disableUpdateBtn = false;
      this.disableUpdateBtn = false;
      this.adminGeneralUserProfileForm.disable();
    }
  }

  // //Signout Modal
  // openSignOut(content11) {
  //   this.modalService.open(content11, { centered: true, size: "sm" })
  //   }
  //   SignOut() {
  //     console.log("SignOut Called")
  //     localStorage.clear()
  //     this.router.navigateByUrl('/administrator')
  //     this.modalService.dismissAll()
  //     //this.openSnackBar(resForCancelAppointment.message,"");
  //   }

    //Signout Modal
   openSignOut(content11) {
    this.modalService.open(content11, { centered: true, size: "sm" })
    }
    SignOut() {
      console.log("SignOut Called")
      localStorage.clear()
      this.router.navigateByUrl('/administrator')
      this.modalService.dismissAll()
      //this.openSnackBar(resForCancelAppointment.message,"");
    }

}
