import { Injectable } from '@angular/core';
import { HttpClient,HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// call api from environment
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.api + '/api.php'; // Adjust to your API URL

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Method to fetch tasks with pagination and search
  getTasks(page: number = 1, limit: number = 10, search: string = ''): Observable<any[]> {
    const headers = this.getHeaders();
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any[]>(`${this.apiUrl}?table=demo_tasks`, { headers, params });
  }

  getTask(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}?table=demo_tasks&id=${id}`, { headers });
  }

  createTask(task: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}?table=demo_tasks&action=insert`, task, { headers });
  }

  updateTask(id: number, task: any): Observable<any> {
    const headers = this.getHeaders();
    // Remove id from the task object if present
    delete task.id;
    return this.http.post<any>(`${this.apiUrl}?table=demo_tasks&action=update&id=${id}`, task, { headers });
  }

  deleteTask(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}?table=demo_tasks&action=delete&id=${id}`, {}, { headers });
  }

  private getHeaders(): HttpHeaders {

    
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + this.authService.getAuth()
    });
  }
}
