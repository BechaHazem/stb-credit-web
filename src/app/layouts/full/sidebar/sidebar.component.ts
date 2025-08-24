import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;

  constructor(public navService: NavService, public account: AccountService) {}

  ngOnInit(): void {}

  showItem(role: string): boolean {
    return this.account.hasAnyAuthority(role);
  }

}
