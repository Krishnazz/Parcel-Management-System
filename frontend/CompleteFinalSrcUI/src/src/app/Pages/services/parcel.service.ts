import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getParcelsByUserId(userId: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}user/TrackingStatus?userId=${userId}`, {});
  }
  getParcelByBookingId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/officer/TrackingStatus/${id}`);
  }

  updatePickupAndDropTime(id: number, body: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/booking/${id}/update-times`, body, { responseType: 'text' });
  }
  
}