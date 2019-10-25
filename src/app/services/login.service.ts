import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http:HttpClient) { }

  adminRegister(data):any{
    return this._http.post("http://3.92.226.247:3000/api/hospital/register",data)
  }
}
