import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/entities/account.entity';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],

})
export class AppSideRegisterComponent {
  constructor(private router: Router,private accountService: AccountService) {}

   form = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  role: new FormControl('CLIENT'),
    phone: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }



  submit() {
    if (this.form.invalid) return;

    const account: Account = this.form.value as Account;

    this.accountService.register(account).subscribe({
      next: (res) => {
        console.log('Registration successful ✅', res);
      alert('Signup successfully ✅');

      // Redirect to login page
      this.router.navigate(['/authentication/login']);
      },
      error: (err) => {
        console.error('Registration failed ❌', err);
        alert('Registration failed: ' + err.error.message);
      },
    });
  }

}
