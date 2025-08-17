import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  private API_URL = environment.apiUrl + '/auth';

  getToken(): string {
    return this.stateStorageService.getAuthenticationToken() ?? '';
  }

  login(credentials: LoginRequest): Observable<void> {
    return this.http
      .post<JwtToken>(`${this.API_URL}/login`, credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.stateStorageService.clearAuthenticationToken();
      observer.next();
      observer.complete();
      this.router.navigate(['']);
    });
  }




  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    this.stateStorageService.storeAuthenticationToken(response.token, rememberMe);
  }
}
