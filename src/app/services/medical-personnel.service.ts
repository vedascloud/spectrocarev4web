import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicalPersonnelService {
  signInRes: any;
  signObj: any;

  res: any;
  accessToken: string;
  id: string = "";
  pMedPersonID: string = "";
  previewImg: any;

  constructor(private _http: HttpClient) { }

  //MedicalPersonnel  Register/SignUp
  medicalPersonnelRegister(data): any {
    console.log("req data to rega as a Doctor from service : ", data);

    return this._http.post("http://34.199.165.142:3000/api/medicalpersonnel/register", data)
  }

}
