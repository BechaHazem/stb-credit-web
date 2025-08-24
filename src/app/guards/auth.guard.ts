import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account/account.service';
import { StateStorageService } from '../services/state-storage/state-storage.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const storage = inject(StateStorageService);
    return accountService.identity().pipe(
    take(1),
    map(account => {
      if (account) return true;
      storage.storeUrl(state.url);
      return router.createUrlTree(['/authentication/login']);
    })
  );  
};
