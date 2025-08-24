import { Injectable } from '@angular/core';
import { Account } from '../entities/account.entity';
import { BehaviorSubject } from 'rxjs';
import { CreditSimulationResponse } from '../entities/credit-simulation.entity';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  public account!: Account;
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
}
