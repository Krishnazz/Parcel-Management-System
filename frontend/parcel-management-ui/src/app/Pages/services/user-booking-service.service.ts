import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserBookingServiceService {

  private apiUrl = 'http://localhost:8080/user/booking'; // Change to your backend URL

  constructor(private http: HttpClient) { }

  bookParcel(userId: string, parcel: any): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    return this.http.post(this.apiUrl, parcel, { params });
  }

  getInvoice(bookingId: number, userId: string): Observable<any> {
    const params = new HttpParams()
      .set('bookingId', bookingId)
      .set('userId', userId);
    return this.http.post('http://localhost:8080/user/invoice', {}, { params });
  }
}
