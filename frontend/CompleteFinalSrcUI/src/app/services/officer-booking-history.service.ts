import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficerBookingHistoryService {

  private apiUrl = 'http://localhost:8080/officer';
  
  
  constructor(private http: HttpClient) { }
  
    getBookingHistory(userId: string,startDate:string,endDate:string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/bookingHistory/${userId}?StartDate=${startDate}&endDate=${endDate}`);
    }
}
