import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api'; // Replace with your Python API URL

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, data);
  }

  // Add other API methods as needed
}
