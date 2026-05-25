import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class LoginServiceService {

  constructor(private http:HttpClient) { }

  login(name: string, pwd: string):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/login?userId=${name}&password=${pwd}`,{});
  }


}
