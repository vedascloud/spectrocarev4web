import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  signInRes: any;
  res: any;
  accessToken: string;
  public isEditable: BehaviorSubject<boolean> = new BehaviorSubject(false)
  constructor(private _http: HttpClient) { }

  //Get  Patients data
  getPatientData(data): any {
    let access_token: any = data.token;
    const options = {
      "userID": data.userID,
      "category": data.category,
      "hospital_reg_num": data.hospital_reg_num,
    }
    console.log("Req For Fetch All Patient for hospital from Patient Service : ", options)
    return this._http.post("http://34.199.165.142:3000/api/hospital/getpatients", options, { headers: { 'x-access-token': access_token } });
  }

  //Fetch Patient Family History
  fetchPatientFamilyHistory(fetchPatientFamilyHistory, accessToken): any {
    console.log("Req For Fetch Patient Family History from Patient Service : ", fetchPatientFamilyHistory);

    return this._http.post("http://34.199.165.142:3000/api/patient/familyhistory/fetch", fetchPatientFamilyHistory, { headers: { 'x-access-token': accessToken } });
  }

  //Fetch Patient Immunization Record
  fetchImmunizationRecord(fetchImmunizationRecordData, accessToken): any {
    return this._http.post("http://34.199.165.142:3000/api/patient/immunization/fetch", fetchImmunizationRecordData, { headers: { 'x-access-token': accessToken } });
  }

  //Update Patient
  updatePatientFamilyHistory(updateRelation, accessToken): any {
    return this._http.put("http://34.199.165.142:3000/api/patient/familyhistory", updateRelation, { headers: { 'x-access-token': accessToken } });
  }

  //
  fetchPatientPhysicalExamRecordsData(fetchPatientPhysicalReocrds, accessToken): any {
    return this._http.post("http://34.199.165.142:3000/api/patient/physicalexamrecord/fetch", fetchPatientPhysicalReocrds, { headers: { 'x-access-token': accessToken } });
  }

  //
  fetchPatientMedicalRecordsData(fetchPatientMedicalReocrds, accessToken): any {
    return this._http.post("http://34.199.165.142:3000/api/patient/medicalrecord/illness/fetchall", fetchPatientMedicalReocrds, { headers: { 'x-access-token': accessToken } });
  }




}
