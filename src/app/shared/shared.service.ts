import { Injectable } from "@angular/core";
import { Account } from "../entities/account.entity";


@Injectable({
    providedIn: 'root'
  })
  export class SharedService {
  public account!: Account;


  public getAccount(): Account {
    return this.account;
  }
  public setAccount(value: Account) {
    this.account = value;
  }

  }