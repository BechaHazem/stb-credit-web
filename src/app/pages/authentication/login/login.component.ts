import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { LoginRequest } from 'src/app/entities/loginRequest.entity';
import { AccountService } from 'src/app/services/account/account.service';
import { AuthServerProvider } from 'src/app/services/auth/auth-jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  private fb = inject(FormBuilder);
  private authServer = inject(AuthServerProvider);
  private accountService = inject(AccountService);
  private router = inject(Router);
    isSaving = false;
  loginError = false;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false],
  });


  constructor() {}

    login(): void {
    if (this.loginForm.invalid) return;

    this.isSaving = true;
    this.loginError = false;

    const credentials: LoginRequest = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
      rememberMe: this.loginForm.value.rememberMe!,
    };

    this.authServer
      .login(credentials)
      .pipe(
        finalize(() => (this.isSaving = false))
      )
      .subscribe({
        next: () => {
          // After JWT is stored in cookie, fetch the account
          this.accountService.identity(true).subscribe();
        },
        error: () => {
          this.loginError = true;
        },
      });
  }

}
