import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthServerProvider } from 'src/app/services/auth/auth-jwt.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
    private auth = inject(AuthServerProvider);
  private account = inject(AccountService);


  showFiller = false;

  constructor(public dialog: MatDialog) {}
    logout(): void {
    // 1️⃣  Tell Spring to invalidate the cookie (optional endpoint)
    // 2️⃣  Clear client-side state
    // 3️⃣  Navigate to login
    this.auth.logout().subscribe({
      next: () => {
        this.account.clearAuthentication(); // clears ReplaySubject + localStorage
        // Router navigation is already inside AuthServerProvider.logout()
      }
    });
  }

}
