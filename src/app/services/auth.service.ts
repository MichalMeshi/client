import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = "https://localhost:7267/api/User";
  constructor(private http: HttpClient, private router: Router) { }

  register(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, userObj);
  }
  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}/login`, loginObj)
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
  storeToken(tokenValue: string) {
    localStorage.setItem("token", tokenValue)
  }
  getToken() {
    return localStorage.getItem("token");
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }
  editProfile(id: string, userDetails: any) {
    return this.http.put<any>(`${this.baseUrl}/edit/${id}`, userDetails);
  }
  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
