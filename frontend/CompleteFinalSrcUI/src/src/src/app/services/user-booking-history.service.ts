import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserBookingHistoryService {

  private apiUrl = 'http://localhost:8080/user/bookingHistory';

  constructor(private http: HttpClient) { }

  getBookingHistory(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }
}
