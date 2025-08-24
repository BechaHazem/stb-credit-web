import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StateStorageService } from '../state-storage/state-storage.service';
import { environment } from 'src/environment';
import { LoginRequest } from 'src/app/entities/loginRequest.entity';

type JwtToken = {
  token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  private http = inject(HttpClient);
  private stateStorageService = inject(StateStorageService);
  private router = inject(Router);

  private API_URL = environment.apiUrl + '/api/auth';

  getToken(): string {
    return this.stateStorageService.getAuthenticationToken() ?? '';
  }

  login(credentials: LoginRequest): Observable<void> {
    return this.http
      .post<JwtToken>(`${this.API_URL}/authenticate`, credentials,{ withCredentials: true })
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
  }

// auth-server.provider.ts
logout(): Observable<void> {
  // 1️⃣  call Spring to revoke token / clear server-side sessions
  return this.http.post<void>(`${this.API_URL}/logout`, {}, { withCredentials: true })
    .pipe(
      // 2️⃣  whatever the server answers, wipe client tokens
      finalize(() => {
        this.stateStorageService.clearAuthenticationToken();
        this.router.navigate(['/authentication/login']);
      }),
      // 3️⃣  if server is down, still logout on client
      catchError(() => {
        this.stateStorageService.clearAuthenticationToken();
        this.router.navigate(['/authentication/login']);
        return EMPTY;
      })
    );
}



private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
  console.log('Token received', response.token); // check if defined
  this.stateStorageService.storeAuthenticationToken(response.token, rememberMe);
}
}
