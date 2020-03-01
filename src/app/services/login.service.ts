import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
signInRes:any;
res:any;
accessToken:string;
id:string="";
pMedPersonID:string="";
  constructor(private _http:HttpClient) {
   }

  //Admin SignUp
  adminRegister(data):any{
    return this._http.post("http://3.92.226.247:3000/api/hospital/register",data)
  }

  //Admin Login
  adminLogin(data):any{
    return this._http.post("http://3.92.226.247:3000/api/hospital/login",data);
  }

  //Forget Password
  forgotPassword(data):any{
    return this._http.post("http://3.92.226.247:3000/api/hospital/forgetpassword",data);
  }

  //Change Password
  changePassword(data):any{
    return this._http.post("http://3.92.226.247:3000/api/hospital/changepassword",data);
  }

  //Get Admin adn Gen-User Data
  getAdminWithGenUserData(addAdminAndGenData,accessToken):any{
    return this._http.post("http://3.92.226.247:3000/api/hospital/getadmins",addAdminAndGenData,{headers:{'x-access-token': accessToken}});
  }

    //Get Admin adn Gen-User Data
    getMedicalPersonnelData(fetchMedicalPersonnelData,accessToken):any{
      return this._http.post("http://3.92.226.247:3000/api/hospital/getmedicalpersonnels",fetchMedicalPersonnelData,{headers:{'x-access-token': accessToken}});
    }

  //Get Medical-Personnel & Patient data
  getMedicalPatientData(mpData):any{
    let token:any = mpData.token;
    let header = new Headers().set("x-access-token",token)
    const options = {
      
        "userID": mpData.userID,
        "category":mpData.category,
        "hospital_reg_num":mpData.hospital_reg_num,
    }
    console.log("OPtions",options)
    return this._http.post("http://3.92.226.247:3000/api/hospital/getmedicalpersonnels",options,{ headers: {'x-access-token': token} });
  }

  //Get  Patients data
  getPatientData(data):any{
    let access_token:any = data.token;
    const options = {
        "userID": data.userID,
        "category":data.category,
        "hospital_reg_num":data.hospital_reg_num,
    }
    console.log("All Patient for hospital ",options)
    return this._http.post("http://3.92.226.247:3000/api/hospital/getpatients",options,{ headers: {'x-access-token': access_token} });
  }

  //Get Patient data
  getPatientInfo(pInfo):any{
    let access_token:any = pInfo.token;
    const options = {
      "userID":pInfo.emailID,
      "searchWord":pInfo.patientID,
      "hospital_reg_num":pInfo.hospital_reg_num,
    }
    console.log("Options",options);
    return this._http.post("http://3.92.226.247:3000/api/hospital/getpatients",options,{headers:{'x-access-token': access_token}});
  }

  //Delete Patient data
  deletePatientInfo(pInfo):any{
    let access_token:any = pInfo.token;
    const options = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': access_token
      }),
      body: {
        "medical_personnel_id":pInfo.medical_personnel_id,
        "hospital_reg_num":pInfo.hospital_reg_num,
        "patientID":pInfo.patientID,
      }
      }
    console.log("Delete Patien Data : ",options);
    return this._http.delete("http://3.92.226.247:3000/api/patient/generalinfo",options);
    //return this._http.delete("http://3.92.226.247:3000/api/patient/generalinfo",op);
  }

  //Update Hospital-Info / Admin Data
  updateAdmin(adminData,accessToken):any{
    console.log("admin data for checking",adminData);
    const sendedData = {
        "userID":adminData.userID,
        "hospital_reg_num":adminData.hospital_reg_num,
        "hospitalName":adminData.hospitalName,
        "emailID":adminData.emailID,
        "phoneNumber":{
          "countryCode":adminData.phoneNumber.countryCode,
          "phoneNumber":adminData.phoneNumber.phoneNumber
        },
        "address":adminData.address,
        "city":adminData.city,
        "state":adminData.state,
        "country":adminData.country,
        "postCode":adminData.postCode,
        "latitude":adminData.latitude,
        "longitude":adminData.longitude
    }
    console.log("Checking",sendedData)
    return this._http.post("http://3.92.226.247:3000/api/hospital/update",sendedData,{headers:{'x-access-token': accessToken}});
  }

  //Update Patient Data
  updatePatient(patientData,accessToken):any{
    
    return this._http.put("http://3.92.226.247:3000/api/patient/generalinfo",patientData,{headers:{'x-access-token': accessToken}});

  }

  //Add Admin General User
  addAdminGenUser(addAdminGenData,accessToken):any{
    
    return this._http.post("http://3.92.226.247:3000/api/hospital/admingeneraluser",addAdminGenData,{headers:{'x-access-token': accessToken}});
  }

  //Update Admin General User
  updateAdminGenUser(updateAdminGenData,accessToken):any{
    console.log("admin gen user data for checking from service : ",updateAdminGenData);
    // const needToUpdate = {
    //     "userID":updateAdminGenData.userID,
    //     "hospital_reg_num":updateAdminGenData.hospital_reg_num,
    //     "firstName":updateAdminGenData.firstName,
    //     "lastName":updateAdminGenData.lastName,
    //     "phoneNumber":{
    //       "countryCode":updateAdminGenData.phoneNumber.countryCode,
    //       "phoneNumber":updateAdminGenData.phoneNumber.phoneNumber
    //     },
    //     "preferLanguage":updateAdminGenData.preferLanguage,
    //     "department":updateAdminGenData.department
    // }
  //  console.log("admin gen user data for checking before sending to api req from service : ",needToUpdate);
    return this._http.post("http://3.92.226.247:3000/api/hospital/updateadmin",updateAdminGenData,{headers:{'x-access-token':accessToken}});
  }

  //Delete Admin General User
  deleteAdminGenUser(deleteAdminGenData,accessToken):any{
    console.log("admin gen user data for delete from service : ",deleteAdminGenData);
    const needToDelete = {
      "adminManagerUserID":deleteAdminGenData.adminManagerUserID,
      "adminUserIDToDelete":deleteAdminGenData.adminUserIDToDelete
    }
    console.log("admin gen user data for delete before sending to api req from service : ",needToDelete);
    return this._http.post("http://3.92.226.247:3000/api/hospital/deleteadmin",needToDelete,{headers:{'x-access-token':accessToken}});

  }

  //Get Patient Medical Records Data
  getPatientMedicalRecordsData(pDataForMedicalRecords,accessToken):any{
    return this._http.post("http://3.92.226.247:3000/api/patient/medicalrecord/fetch",pDataForMedicalRecords,{headers:{'x-access-token': accessToken}});
  }

  //Get Admin/Hospital Appointment  Data
  getAdminAppointmentData(fetchAppointmentData,accessToken):any{
    return this._http.post("http://3.92.226.247:3000/api/appointments/allappointmentsforhospital",fetchAppointmentData,{headers:{'x-access-token': accessToken}});
  }

  //Cancel Appointment
  cancelAppointment(reqDataForCancelAppointment,accessToken):any{
    return this._http.post("http://3.92.226.247:3000/api/appointments/cancelappointment",reqDataForCancelAppointment,{headers:{'x-access-token': accessToken}});
  }

  //Reschedule Appointment
  rescheduleAppointment(reqDataForRescheduleAppointment,accessToken):any{
    return this._http.post("http://3.92.226.247:3000/api/appointments/appointmentreschedule",reqDataForRescheduleAppointment,{headers:{'x-access-token': accessToken}});
  }

  //Book Appointment
  bookAppointmentService(reqDataForBookAppointment,accessToken):any{
    return this._http.post("http://3.92.226.247:3000/api/appointments/bookappointment",reqDataForBookAppointment,{headers:{'x-access-token': accessToken}})
  }

  // //Fetch Patient Family History
  // fetchPatientFamilyHistory(fetchPatientFamilyHistory,accessToken):any {
  //   return this._http.post("http://3.92.226.247:3000/api/patient/familyhistory/fetch",fetchPatientFamilyHistory,{headers:{'x-access-token': accessToken}});
  // }

  //Get Data for testing purpose used in home(main-home) page
  // getData():any{
  //   return this._http.get("http://3.84.49.133/V-Mart/product");
  // }
}
