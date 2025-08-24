import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { StateStorageService } from '../state-storage/state-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private stateStorageService = inject(StateStorageService);
  private router = inject(Router);

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string | null =
      this.stateStorageService.getAuthenticationToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // Optional: You may want to navigate only for certain endpoints (like /api/private)
      // this.router.navigateByUrl('');
    }

    return next.handle(request);
  }
}
