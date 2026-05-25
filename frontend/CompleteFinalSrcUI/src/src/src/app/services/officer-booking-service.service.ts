import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficerBookingServiceService {

  private apiUrl = 'http://localhost:8080/officer/booking'; // Change to your backend URL
  
    constructor(private http: HttpClient) { }
  
    bookParcel(userId: string, parcel: any): Observable<any> {
      const params = new HttpParams().set('userId', userId);
      return this.http.post(this.apiUrl, parcel, { params });
    }
}
