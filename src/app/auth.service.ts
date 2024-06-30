import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// call api from environment
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //https://claude.ai/chat/51dfe502-2235-4c7c-917a-00bb298fceba
  private apiUrl = environment.api +  '/login.php';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const encodedCredentials = btoa(email + ':' + password);
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + encodedCredentials
    });

    return this.http.post(this.apiUrl, {}, { headers: headers, observe: 'response' }).pipe(
      tap((response) => {
        if (response.status === 200) {
          localStorage.setItem('auth', encodedCredentials);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth');
  }

  getAuth(): string | null {
    return localStorage.getItem('auth');
  }

  isLoggedIn(): boolean {
    return !!this.getAuth();
  }

  getAuthorizationHeader(): HttpHeaders {
    const auth = this.getAuth();
    return new HttpHeaders({
      'Authorization': `Basic ${auth}`
    });
  }
}