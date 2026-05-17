import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {MapTaskResponseToUpdate, TaskCreateRequest, TaskRequest, TaskResponse } from './models';
import { environment } from '../../../environments/environment';



@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/TodoItems`;

  getAll(): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(this.baseUrl);
  }

  getById(id: number): Observable<TaskRequest> {
    return this.http.get<TaskResponse>(`${this.baseUrl}/${id}`).pipe(
      map( (data : TaskResponse) => MapTaskResponseToUpdate(data))
    );
  }

  create(task: TaskCreateRequest): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.baseUrl, task);
  }

  update(id: number, task: TaskRequest): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this.baseUrl}/${id}`, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
