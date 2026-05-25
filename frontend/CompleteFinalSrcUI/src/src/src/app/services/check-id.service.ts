import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class checkId {
  private apiUrl = 'https://10.58.247.128:8080/checkingId';

  constructor(private http: HttpClient) {}

  checkUsername(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}?username=${username}`);
  }
}