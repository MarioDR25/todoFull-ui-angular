import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../../core/services/storage.service';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from './models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly storage = inject(StorageService);

  private _token = signal<string | null>(this.storage.get('token'));
  public isAuthenticated = computed(() => !!this._token());
  

  login(credentials: LoginRequest ): Observable<AuthResponse> {
    return this.http.post(`${environment.apiUrl}/Auth/login`, credentials).pipe(
      tap((res: any) => {
        this.storage.set('token', res.token);
        this.storage.set('name', JSON.stringify(res.name));
      }),
    );
  }

  register(data: RegisterRequest ): Observable<AuthResponse> {
    return this.http.post(`${environment.apiUrl}/Auth/register`, data).pipe(
      tap((res: any) => {
        this.storage.set('token', res.token);
        this.storage.set('name', JSON.stringify(res.name));
      }),
    );
  }

  logout(): void {
    this.storage.remove('token');
    this.storage.remove('name');
    this._token.set(null);
    this.router.navigate(['/auth/login']);
  }
}
