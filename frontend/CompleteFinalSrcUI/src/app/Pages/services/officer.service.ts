import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {


  private baseUrl = 'http://localhost:8080/officer';

  constructor(private http: HttpClient) {}

  updateParcelStatus(parcelId: number, status: string) {
    const params = new HttpParams()
      .set('parcelId', parcelId)
      .set('status', status);

    return this.http.put(`${this.baseUrl}/update_status`, {}, { params,responseType: 'text' });
  }
}