import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  title = 'Modernize Angular Admin Tempplate';

  constructor(private accountService : AccountService){}
  ngOnInit(): void {
      this.accountService.identity().subscribe({ });
  }
}
