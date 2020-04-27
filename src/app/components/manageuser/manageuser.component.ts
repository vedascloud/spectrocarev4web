import { Component, OnInit ,ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder ,Validators, AbstractControl} from '@angular/forms';
import { MatSnackBar ,MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-manageuser',
  templateUrl: './manageuser.component.html',
  styleUrls: ['./manageuser.component.css']
})
export class ManageuserComponent implements OnInit {
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.India, CountryISO.UnitedStates, CountryISO.UnitedKingdom, CountryISO.Taiwan, CountryISO.China, CountryISO.Malaysia];
  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }

  addAdminGenUserForm: FormGroup;
  adminGeneralUserProfileForm:FormGroup;
  medicalUserProfileForm:FormGroup;
  changePasswordForm:FormGroup;
  closeResult: string;
  signInRes: any;
  signObj: any;
  userID: string;
  loading:boolean;
  isLoading: boolean = false;
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
  previewImg: any;
  previewImg1: any;
  previewImg2: any;
  isIdentity:string= "Administrator System Manager";

  titleArray:any =
  {title:"Admin Center",
  subTitle:"Manage User",
  img:"assets/images/ui/Icons/1x/admin center.png"};

   //show date
  n =  new Date();
  y = this.n.getFullYear();
  m = this.n.getMonth() + 1;
  d = this.n.getDate();
  presentDate = this.m + "/" + this.d + "/" + this.y;

  departments = [
    { value: 'Pharmacy', viewValue: 'Pharmacy' },
    { value: 'Admissions', viewValue: 'Admissions' },
    { value: 'Cardiology', viewValue: 'Cardiology' },
    { value: 'Administrative', viewValue: 'Administrative'},
    { value: 'Medical', viewValue: 'Medical'},
    { value: 'Paramedical', viewValue: 'Paramedical'},
    { value: 'Reception', viewValue: 'Reception'},
    { value: 'Radiology', viewValue: 'Radiology'},
    { value: "Haematology", viewValue :"Haematology"},
    { value: 'Critical Care', viewValue: 'Critical Care'}
  ];

  identitys = [
    { value: 'Administrator System Manager', viewValue: 'Administrator System Manager'},
    { value: 'Administrator General', viewValue: 'Administrator General'},
    { value: 'Pharmacy', viewValue: 'Pharmacy' },
    { value: 'Admissions', viewValue: 'Admissions' },
    { value: 'Cardiology', viewValue: 'Cardiology' },
    { value: 'Administrative', viewValue: 'Administrative'},
    { value: 'Medical', viewValue: 'Medical'},
    { value: 'Paramedical', viewValue: 'Paramedical'},
    { value: 'Reception', viewValue: 'Reception'},
    { value: 'Radiology', viewValue: 'Radiology'},
    { value: "Haematology", viewValue :"Haematology"}
  ];

  preferLanguages = [
    { value: 'English', viewValue: 'English' },
    { value: 'Chinese', viewValue: 'Chinese' },
    { value: 'French', viewValue: 'French' },
    { value: 'Spanish', viewValue: 'Spanish'},
    { value: 'Taipe', viewValue: 'Taipe'}
  ];

  @ViewChild('autoFocusTest',{static:false}) nativeEl:ElementRef;  
  @ViewChild('fileInput', { static: true }) el: ElementRef;

  constructor(private router:Router,private loginService: LoginService, private modalService: NgbModal, private fb: FormBuilder,
    private _snackBar: MatSnackBar,private cd: ChangeDetectorRef,private patientService:PatientService) { }

  ngOnInit() {
    this.patientService.isEditable.next(true);
    this.previewImg = "../../../assets/images/ui/Icons/1x/profile-1.png";
    this.previewImg1 = "../../../assets/images/ui/Icons/1x/profile-1.png";
    this.previewImg2 = "../../../assets/images/ui/Icons/1x/profile-1.png";
    this.checkAdministrator = localStorage.getItem("AdministratorSystemManager");
    this.loading = true;
    this.signInRes = localStorage.getItem("SignInRes");
    if (this.signInRes) {
      this.signObj = JSON.parse(this.signInRes);
      this.userID = localStorage.getItem('userID');
      this.fetchAdminGenralData();
      this.fetchMedicalPersonnelsData();     
    }

    //Add Admin General User
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
      checkPhone: ['',[Validators.required]],
      phoneNumber: this.fb.group({
        countryCode:['',Validators.required],
        phoneNumber:['',Validators.required],
      }),
      profilePic: [""],
    },
    {
      validators:this.checkPasswords
    });
    this.autoAddAdminGenUserData(this.signObj);
    
    //View Admin Gen User Form
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
      checkPhone: ['',[Validators.required]],
      phoneNumber: this.fb.group({
        countryCode:[''],
        phoneNumber:[''],
      }),
      profilePic: [""],
    });
    this.adminGeneralUserProfileForm.disable();

    //View Medical Personnel Form
    this.medicalUserProfileForm = this.fb.group({
      userID:[""],
      specialization:[""],
      hospital_reg_num:[""],
      registerTime:[""],
      firstName:[""],
      lastName:[""],
      emailID:[""],
      department:[""],
      checkPhone: ['',[Validators.required]],
      phoneNumber: this.fb.group({
        countryCode:[''],
        phoneNumber:[''],
      }),
      profilePic: [""],
      userType:[""]
    });
    this.medicalUserProfileForm.disable();

    //Giving Access Controls to AdministratorSystemManager & AdministratorGeneral
    if(this.checkAdministrator === "3"){
      this.isAdminSystmMngr = true; 
    }
    else{
      this.isAdminSystmMngr = false;      
    }

     //Change Pwd
     this.changePasswordForm =this.fb.group({
      "userID":["",[Validators.required,Validators.email]],
      "oldPassword":['',[Validators.required,Validators.minLength(8)]],
      "newPassword":['',[Validators.required,Validators.minLength(8)]]
    })
  }

   //Image Upload in Add Admin User
   fileProgress(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.addAdminGenUserForm.get('profilePic').setValue(file);
        this.previewImg = reader.result
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.addAdminGenUserForm.get('profilePic').setValue(null)
  }
  //Img Upload complete here

  //Image Upload Update Admin Gen User
  fileProgress1(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.adminGeneralUserProfileForm.get('profilePic').setValue(file);
        this.previewImg1 = reader.result
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  removeUploadedFile1() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.adminGeneralUserProfileForm.get('profilePic').setValue(null)
  }
  //Img Upload complete here

  //Image Upload Update Admin Gen User
  fileProgress2(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.medicalUserProfileForm.get('profilePic').setValue(file);
        this.previewImg2 = reader.result
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();
    }
  }
  removeUploadedFile2() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.medicalUserProfileForm.get('profilePic').setValue(null)
  }
  //Img Upload complete here

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
    }
    //Get Admin-data & Admin-general-user-data
    this.loginService.getAdminWithGenUserData(regAdminWithGenUserData,this.signObj.access_token).subscribe(
      (resAdminWithGenUserData)=>{
        if(resAdminWithGenUserData.response === 3){
          this.isViewAdmin=true;
          this.loading= false;
          this.adminTeam = resAdminWithGenUserData.adminusers;
          this.adminTeamData = resAdminWithGenUserData.adminusers;
          console.log("admin team data : ",this.adminTeam);
        }
        else{
          this.loading= false;
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

  //Fetch Medical Personnels Data
  fetchMedicalPersonnelsData(){
    let fetchMedPersonUserData = {
      "userID": this.userID,
      "category":"All",
      "hospital_reg_num":this.signObj.hospitalAdmin.hospital_reg_num,
    }
    //Get Medical Personnel Data
    this.loginService.getMedicalPersonnelData(fetchMedPersonUserData,this.signObj.access_token).subscribe(
      (resForFetchMedicalPersonnelData)=>{
        if(resForFetchMedicalPersonnelData.response === 3){
          this.loading= false;         
          this.medicalPersonnels = resForFetchMedicalPersonnelData.medicalPersonnels;
          console.log("Medical Personnels data : ",this.medicalPersonnels);
        }
        else{
          this.loading= false;
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
    this.isLoading = true;
    let countryCode1 = this.addAdminGenUserForm.get(["checkPhone"]).value;
    var str1 = countryCode1.number;
    str1 = str1.replace(/ +/g, "");
    this.addAdminGenUserForm.patchValue({    
        phoneNumber: {
          countryCode: countryCode1.dialCode,
          phoneNumber: str1
        }      
    })
    let payLoad = this.addAdminGenUserForm.value;
    delete payLoad.checkPhone
    delete payLoad.confirmpassword;
    delete payLoad.profilePic;
    let formData = new FormData();
    formData.append("adminData",JSON.stringify(payLoad));
    formData.append("profilePic",this.addAdminGenUserForm.get('profilePic').value);    
    this.loginService.addAdminGenUser(formData, this.signObj.access_token).subscribe(
      (addAdminGenUserRes)=>{
        if(addAdminGenUserRes.response === 3){
          this.isLoading = false;
          this.openSnackBar(addAdminGenUserRes.message,"");
          this.loading= false;
          this.modalService.dismissAll();
          this.addAdminGenUserForm.reset();
          this.fetchAdminGenralData();
        }
        else{
          this.isLoading = false;
          this.openSnackBar(addAdminGenUserRes.message,"");
        }
      },
      (err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          this.isLoading = false;
          this.loading= false;
          console.log("Client Side Error",err);
        }else{
          this.isLoading = false;
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
    this.patientService.isEditable.next(false)
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',centered:true,size:'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.patientService.isEditable.next(true)

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
       checkPhone:adminTeam.phoneNumber.phoneNumber,
       phoneNumber:{
        phoneNumber:adminTeam.phoneNumber.phoneNumber,
        countryCode:adminTeam.phoneNumber.countryCode
      }
    });
    if(adminTeam.profilePic === ""){      
      this.previewImg1= "../../../assets/images/ui/Icons/1x/profile-1.png";
     }
     else if(adminTeam.profilePic === "../../../assets/images/ui/Icons/1x/profile-1.png"){
      this.previewImg1= this.signObj.hospitalAdmin.profilePic;
     }
     else{
     this.previewImg1= "http://3.92.226.247:3000"+adminTeam.profilePic;
    }
    this.openView()
  }

  openViewTwo(medicalTeam){
    console.log("Selected Medical User To View Data : ",medicalTeam);
    this.medicalUserProfileForm.patchValue({
      userID:medicalTeam.userID,
      specialization:medicalTeam.specialization,
      userType:medicalTeam.userType,
       hospital_reg_num:medicalTeam.hospital_reg_num,
       registerTime:medicalTeam.registerTime,
       firstName:medicalTeam.firstName,
       lastName:medicalTeam.lastName,
       emailID:medicalTeam.emailID,
       department:medicalTeam.department,
       checkPhone:medicalTeam.phoneNumber.phoneNumber,
       phoneNumber:{
        phoneNumber:medicalTeam.phoneNumber.phoneNumber,
        countryCode:medicalTeam.phoneNumber.countryCode
      }
    });
    if(medicalTeam.profilePic === ""){      
      this.previewImg2= "../../../assets/images/ui/Icons/1x/profile-1.png";
     }
     else if(medicalTeam.profilePic === "../../../assets/images/ui/Icons/1x/profile-1.png"){
      this.previewImg2= "../../../assets/images/ui/Icons/1x/profile-1.png";
     }
     else if(medicalTeam.profilePic !== ""){
      this.previewImg2= "http://3.92.226.247:3000"+medicalTeam.profilePic;       
     }
     else{
      this.previewImg2 = "../../../assets/images/ui/Icons/1x/profile-1.png";
    }
    this.openView()
  }

  //update Admin Gen Data
  updateAdminGenUserSubmit(){
    this.isLoading = true;
    let countryCode1 = this.adminGeneralUserProfileForm.get(["checkPhone"]).value;
    var str1 = countryCode1.number;
    str1 = str1.replace(/ +/g, "");
    this.adminGeneralUserProfileForm.patchValue({    
        phoneNumber: {
          countryCode: countryCode1.dialCode,
          phoneNumber: str1
        }      
    })
    let payLoad = this.adminGeneralUserProfileForm.value
    delete payLoad.profilePic;
    delete payLoad.checkPhone;
    delete payLoad.verificationStatus;
    delete payLoad.identity;
    delete payLoad.registerTime;
    delete payLoad.emailID;
    let formData = new FormData()
    formData.append("adminData",JSON.stringify(payLoad));
    formData.append("profilePic",this.adminGeneralUserProfileForm.get('profilePic').value)
    this.loginService.updateAdminGenUser(formData,this.signObj.access_token).subscribe(
      (updateAdminGenUserRes)=>{        
        if(updateAdminGenUserRes.response === 3){
          this.isLoading = false;
          this.openSnackBar(updateAdminGenUserRes.message,"");
          this.loading= false;
          //this.modalService.dismissAll();
          //this.adminGeneralUserProfileForm.reset();
          this.fetchAdminGenralData();
        }
        else{
          this.isLoading = false;
          this.openSnackBar(updateAdminGenUserRes.message,"");
          //alert(updateAdminGenUserRes.message);
        }
      },
      (err:HttpErrorResponse)=>{
        if(err.error instanceof Error){
          this.isLoading = false;
          this.loading= false;
          console.log("Client Side Error",err);
          
        }else{
          this.isLoading = false;
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
      this.isLoading = true;
      console.log("Admin Gen User Data to delete : ",clientObj)
      let delObj = {
        "adminManagerUserID":this.signObj.hospitalAdmin.emailID,
        "adminUserIDToDelete":clientObj.userID
      }
      this.loginService.deleteAdminGenUser(delObj,this.signObj.access_token).subscribe((deleteAdminGenres)=>{
        console.log("delete admin gen data res : ",deleteAdminGenres);
        if(deleteAdminGenres.response === 3){
          this.isLoading = false
          this.openSnackBar(deleteAdminGenres.message,"");
          this.modalService.dismissAll();
          this.fetchAdminGenralData();
        }
        else{
          this.isLoading = false;
          this.openSnackBar(deleteAdminGenres.message,"");
          this.modalService.dismissAll();
          alert(deleteAdminGenres.message);
        }
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.isLoading = false;
          this.loading = false;
          console.log("Client Side Error")
        } else {
          this.isLoading = false
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
    this.loginService.changePassword(this.changePasswordForm.value).subscribe(
      (changePwdRes)=>{
        if(changePwdRes.response === 3){
          this.router.navigateByUrl('/adminprofile')
          this.modalService.dismissAll();
          this.changePasswordForm.reset();
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
    this.adminGeneralUserProfileForm.disable();
  }
  closeView(){
    this.isViewAdmin = true;
    this.disableUpdateBtn = false;
    this.patientService.isEditable.next(true)
    // this.modalService.dismissAll();
    // this.addAdminGenUserForm.reset();    
    // this.adminGeneralUserProfileForm.reset();
  }

  openUpdate(){
    if (this.disableUpdateBtn === false) {
      this.disableUpdateBtn = true;
      this.adminGeneralUserProfileForm.enable();      
      this.nativeEl.nativeElement.focus();
      this.patientService.isEditable.next(false)
    }
    else{
      this.disableUpdateBtn = false;
      this.adminGeneralUserProfileForm.disable();
      this.patientService.isEditable.next(true)
    }
  }   
}
