import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  confirmPassword(pwd:string,cpwd:string):boolean{
    if(pwd==cpwd)return true;
    else return false;
  }


  register(user:any):Observable<any>{
    const url = "http://localhost:8080";
    return this.http.post<any>(url+"/user/register",user)
  }
}
