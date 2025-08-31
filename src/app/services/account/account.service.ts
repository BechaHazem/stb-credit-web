import { inject, Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, of } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';
import { Account } from 'src/app/entities/account.entity';
import { StateStorageService } from '../state-storage/state-storage.service';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environment';


@Injectable({ providedIn: 'root' })
export class AccountService {
  private userIdentity = signal<Account | null>(null);
  private authenticationState = new ReplaySubject<Account | null>(1);
  private accountCache$?: Observable<Account> | null;

  private http = inject(HttpClient);
  private stateStorageService = inject(StateStorageService);
  private router = inject(Router);
  private sharedService = inject(SharedService);

  save(account: Account): Observable<{}> {
    return this.http.post(environment.apiUrl + '/account', account);
  }
  register(account: Account): Observable<any> {
  return this.http.post(environment.apiUrl + '/api/auth/register', account);
}


  authenticate(identity: Account | null): void {
    this.userIdentity.set(identity);
    this.authenticationState.next(this.userIdentity());
    if (!identity) {
      this.accountCache$ = null;
    } else {
      this.sharedService.setAccount(identity);
      localStorage.setItem('currentUser', JSON.stringify(identity));
    }
  }

  trackCurrentAccount(): Signal<Account | null> {
    return this.userIdentity.asReadonly();
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    const userIdentity = this.userIdentity();
    if (!userIdentity || !userIdentity.role) {
      return false;
    }

    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }

    return authorities.includes(userIdentity.role);
  }

  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force) {
      this.accountCache$ = this.fetch().pipe(
        tap((account: Account) => {
          this.authenticate(account);
          

          const previousUrl = this.stateStorageService.getUrl();
          if (previousUrl) {
            this.stateStorageService.clearUrl();
            this.router.navigateByUrl(previousUrl);
          } else {
            this.navigateByRole(account);
          }
        }),
        shareReplay()
      );
    }
    return this.accountCache$.pipe(catchError(() => of(null)));
  }

  isAuthenticated(): boolean {
    return this.userIdentity() !== null;
  }

  getAuthenticationState(): Observable<Account | null> {
    return this.authenticationState.asObservable();
  }

  private fetch(): Observable<Account> {
    return this.http.get<Account>(environment.apiUrl + '/api/auth/profile',{ withCredentials: true });
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }
  clearAuthentication(): void {
    this.userIdentity.set(null);
    this.authenticationState.next(null);
    localStorage.removeItem('currentUser');
    this.accountCache$ = null;
  }
  private navigateByRole(account: Account): void {
    switch (account.role) {
      case 'ADMIN':
        this.router.navigate(['/']);
        break;
      case 'BANQUIER':
        this.router.navigate(['/request-list']);
        break;
      case 'CLIENT':
        this.sharedService.setCustomer(account.customer)
        this.router.navigate(['/']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }
}
