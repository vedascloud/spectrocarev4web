import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-hospital-roles',
  templateUrl: './hospital-roles.component.html',
  styleUrls: ['./hospital-roles.component.css']
})
export class HospitalRolesComponent implements OnInit {
  term: any;
  selectedData: any;
  departmentsData: any = [
    { "deptName": "System Administrator", "location": "R101", "Items": "Urine test", "Amount": "10", "Issuedate": "2020-03-13", "Status": "Draft" },
    { "deptName": "Administrator", "location": "R101", "Items": "Urine test", "Amount": "20", "Issuedate": "2020-03-14", "Status": "Paid" },
    { "deptName": "Admissions Clerk", "location": "R101", "Items": "Urine test", "Amount": "50", "Issuedate": "2020-03-23", "Status": "Unpaid" },
    { "deptName": "Admissions Director", "location": "R101", "Items": "Urine test", "Amount": "10", "Issuedate": "2020-04-13", "Status": "Overdue" },
    { "deptName": "Accountant", "location": "R101", "Items": "Urine test", "Amount": "20", "Issuedate": "2020-02-23", "Status": "Paid" },
    { "deptName": "Billing Manager", "location": "R101", "Items": "Urine test", "Amount": "60", "Issuedate": "2020-04-31", "Status": "Draft" },
  ]
  medicalRolesData: any = [
    { "roleName": "Medical Person", "location": "R101", "Items": "Urine test", "Amount": "10", "Issuedate": "2020-03-13", "Status": "Draft" },
    { "roleName": "Doctor", "location": "R101", "Items": "Urine test", "Amount": "20", "Issuedate": "2020-03-14", "Status": "Paid" },
    { "roleName": "Nurse", "location": "R101", "Items": "Urine test", "Amount": "50", "Issuedate": "2020-03-23", "Status": "Unpaid" },
    { "roleName": "Ward Men", "location": "R101", "Items": "Urine test", "Amount": "10", "Issuedate": "2020-04-13", "Status": "Overdue" },
    { "roleName": "Ward Boy", "location": "R101", "Items": "Urine test", "Amount": "20", "Issuedate": "2020-02-23", "Status": "Paid" },
  ];
  medicalRolesData1: any = [];
  signInRes: any;
  signObj: any;
  userID: string;
  loading: boolean;
  isLoading: boolean = false;
  isAlter: boolean = false;
  addDepartmentForm: FormGroup;
  fetchAdministrativeRolesDataObj: any;
  fetchMedicalRolesDataObj: any;
  addHospitalDepartmentsDataObj: any;
  ServicesDataArray: any = [];
  rolesObjArray:any = [];
  readyToSendHospitalRoles:any = [];
  sendedServicesDataArray: any = [];
  addServiceForm: FormGroup;
  //show date
  n = new Date();
  y = this.n.getFullYear();
  m = this.n.getMonth() + 1;
  d = this.n.getDate();
  presentDate = this.m + "/" + this.d + "/" + this.y;

  constructor(private loginService: LoginService, private fb: FormBuilder,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.signInRes = localStorage.getItem("SignInRes");
    if (this.signInRes) {
      this.signObj = JSON.parse(this.signInRes);
      this.userID = localStorage.getItem('userID');
      //this.fetchHospitalDepartmentsData();

    }
    this.fetchAdministrativeRolesData();
    this.fetchMedicalRolesData();
    this.loading = true;
    //this.selectedData = this.departmentsData;
    this.addServiceForm = this.fb.group({
      serviceHistory: this.fb.array([

      ])
    });

  }

  //Fetch Administrative Roles
  fetchAdministrativeRolesData() {
    this.selectedData = [];
    this.rolesObjArray = [];
    let fetchAdministrativeRolesDataObj = {
      "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num,
    }
    console.log("req for fetch administrative roles : ", fetchAdministrativeRolesDataObj);
    //Get fetchHospitalDepartmentsDataObj
    this.loginService.getAdministrativeRolesData(fetchAdministrativeRolesDataObj, this.signObj.access_token).subscribe(
      (resForFetchAdministrativeRolesData) => {
        if (resForFetchAdministrativeRolesData.response === 3) {
          this.loading = false;
          this.selectedData = [];
          this.rolesObjArray = [];
          this.selectedData = resForFetchAdministrativeRolesData.administrativeRoles;

          console.log("before add extra value : ", this.selectedData);
          
          for (var value of this.selectedData) {
            this.rolesObjArray.push({ name: value, isAlter: true });
          }
          console.log("the new array : ", this.rolesObjArray);

        }
        else {
          console.log("failed case", resForFetchAdministrativeRolesData.message);

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
      }
    );
  }

  addDepartmentToList() {
    //unshift
    this.rolesObjArray.push({
      name: [""],
    })
  }

  editDepartment(index) {
    console.log(index);
    console.log(this.rolesObjArray[index]);
    this.rolesObjArray[index].isAlter = false;
    console.log("data ", this.rolesObjArray);

  }
  removeService(index) {
    this.rolesObjArray.splice(index,1);
  }
  updatedIndexBasedValue(index, name) {
    this.rolesObjArray[index] = {
      name: name.value,
      isAlter: true
    }
  }

  addAdminPersonalSettingsSubmit() {
    this.loading = true;
    console.log("available data : ", this.selectedData);
    //this.ServicesDataArray = [];
    let DataArray: any[] = this.rolesObjArray;
    for (let i = 0; i <= DataArray.length - 1; i++) {
      let aleteredData = DataArray[i];
      delete aleteredData.isAlter;
      this.sendedServicesDataArray.push(aleteredData);
    }
    //let obj = JSON.parse(this.sendedServicesDataArray)
    console.log(this.sendedServicesDataArray);

    for(let i=0; i<=this.sendedServicesDataArray.length-1;i++){
      let obj2 = this.sendedServicesDataArray[i];
      var myobj = JSON.parse(JSON.stringify(obj2));
      var obj3 = myobj.name;      
      this.readyToSendHospitalRoles.push(obj3);
    }
    this.addHospitalDepartmentsDataObj = {
      "adminManagerUserID": this.signObj.hospitalAdmin.userID,
      "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num,
      "administrativeRoles": Object.assign(this.readyToSendHospitalRoles)
    }

    console.log(this.addHospitalDepartmentsDataObj);


    this.loginService.addAdministrativeRolesData(this.addHospitalDepartmentsDataObj, this.signObj.access_token)
    .subscribe(
      (resForAddDepartmentsData) => {
        if (resForAddDepartmentsData.response === 3) {
          this.loading = false;
          this.openSnackBar(resForAddDepartmentsData.message, "");

          this.fetchAdministrativeRolesData();
        }
        else{
          this.openSnackBar(resForAddDepartmentsData.message, "");
        }
      })

  }

  //Fetch Administrative Roles
  fetchMedicalRolesData() {
    let fetchMedicalRolesDataObj = {
      "hospital_reg_num": this.signObj.hospitalAdmin.hospital_reg_num,
    }
    console.log("req for fetch medical roles : ", fetchMedicalRolesDataObj);
    //Get fetchHospitalDepartmentsDataObj
    this.loginService.getMedicalRolesData(fetchMedicalRolesDataObj, this.signObj.access_token).subscribe(
      (resForFetchAdministrativeRolesData) => {
        if (resForFetchAdministrativeRolesData.response === 3) {
          this.loading = false;
          this.medicalRolesData1 = resForFetchAdministrativeRolesData.medicalRoles;

          console.log("fetched medical roles value : ", this.medicalRolesData1);
          // for (let i = 0; i <= this.selectedData.length - 1; i++) {
          //   //console.log("the for loop data : ", this.selectedData[i]);
          //   //this.ServicesDataArray.push(Object.assign({name:this.selectedData[i]}, { isAlter: true }));
          //   this.ServicesDataArray.push(Object.assign(this.selectedData[i], { isAlter: true }));
          //   //console.log(this.selectedData[i]);
          // }
          // console.log("after add extra value : ", this.ServicesDataArray);

        }
        else {
          console.log("failed case", resForFetchAdministrativeRolesData.message);

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
      }
    );
  }

  //Mat Snack Bar
 openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 5000,
    verticalPosition: 'bottom', // 'top' | 'bottom'
    horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'
  })
}

  //Tab Change Event
  onTabChange(event) {
    console.log("event", event)
  }

}
