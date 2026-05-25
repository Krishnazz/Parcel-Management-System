import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficerBookingHistoryService {
  private apiUrl = 'http://localhost:8080/officer/bookingHistory';

  constructor(private http: HttpClient) { }

  getBookingHistory(userId: string, startDate: string, endDate: string): Observable<any[]> {
    const params = new HttpParams()
      .set('StartDate', startDate)
      .set('endDate', endDate);
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`, { params });
  }
}
