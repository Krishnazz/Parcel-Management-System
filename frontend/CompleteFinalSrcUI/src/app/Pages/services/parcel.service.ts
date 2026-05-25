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
    return this.http.get(`${this.baseUrl}officer/TrackingStatus/${id}`);
  }

  updatePickupAndDropTime(parcelId: number, times: { pickupTime: string, dropOffTime: string }): Observable<any> {
    const params = new URLSearchParams({
      parcelId: parcelId.toString(),
      pickupTime: times.pickupTime,
      dropoffTime: times.dropOffTime
    }).toString();
  
    return this.http.put(`${this.baseUrl}officer/update-time?${params}`, null, { responseType: 'text' });
  }
  
  
}