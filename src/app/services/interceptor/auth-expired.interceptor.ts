import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { StateStorageService } from "../state-storage/state-storage.service";

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  // private loginService = inject(LoginService);
  private stateStorageService = inject(StateStorageService);
  private router = inject(Router);

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (err.status === 401 && err.url && !err.url.includes('api/account')) {
            this.stateStorageService.storeUrl(this.router.routerState.snapshot.url);
            // this.loginService.logout();
            this.router.navigate(['login']);
          }
        },
      }),
    );
  }
}