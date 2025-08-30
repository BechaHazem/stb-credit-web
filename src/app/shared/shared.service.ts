import { Injectable } from '@angular/core';
import { Account } from '../entities/account.entity';
import { BehaviorSubject } from 'rxjs';
import { CreditSimulationResponse } from '../entities/credit-simulation.entity';
import { Customer } from '../entities/customer.entity';
import { LoanRequest } from '../entities/loan-request.entity';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public account!: Account;
  public customer!: Customer;
  loan!: LoanRequest;
  private simulationSource =
    new BehaviorSubject<CreditSimulationResponse | null>(null);
  simulation$ = this.simulationSource.asObservable();

  setSimulation(sim: CreditSimulationResponse) {
    this.simulationSource.next(sim);
  }

  clearSimulation() {
    this.simulationSource.next(null);
  }

  public getAccount(): Account {
    return this.account;
  }
  public setAccount(value: Account) {
    this.account = value;
  }
    public getCustomer(): Customer {
    return this.customer;
  }
  public setCustomer(value: Customer) {
    this.customer = value;
  }
  public getLoanRequest(): LoanRequest {
    return this.loan;
  }
  public setLoanRequest(value: LoanRequest) {
    this.loan = value;
  }
}
