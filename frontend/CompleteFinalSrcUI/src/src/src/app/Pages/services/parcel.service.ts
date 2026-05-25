import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {
  private baseUrl = 'http://10.58.247.128:8080/api/parcel';

  constructor(private http: HttpClient) {}

  getParcelsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/track/user/${userId}`);
  }

  
  getParcelByBookingId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/booking/${id}`);
  }

  updatePickupAndDropTime(id: number, body: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/booking/${id}/update-times`, body, { responseType: 'text' });
  }
  
}