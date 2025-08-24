import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {
  AmortizationLine,
  CreditSimulationRequest,
  CreditSimulationResponse,
} from 'src/app/entities/credit-simulation.entity';
import { CreditService } from 'src/app/services/credit.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-simulateur-credit',
  templateUrl: './simulateur-credit.component.html',
  styleUrls: ['./simulateur-credit.component.scss'],
})
export class SimulateurCreditComponent implements OnInit {
  form = this.fb.group({
    montant: [0, [Validators.required, Validators.min(1000)]],
    duree: [0, [Validators.required, Validators.min(1), Validators.max(60)]],
    gracePeriod: [0, [Validators.min(0), Validators.max(3)]],
  });
currentSim!: CreditSimulationResponse | null

  resultat: CreditSimulationResponse | null = null;
  loading = false;
  error: string | null = null;
  saving = false;
  displayedColumns: string[] = [
    'period',
    'openingBalance',
    'payment',
    'interest',
    'principal',
    'closingBalance',
  ];
  dataSource = new MatTableDataSource<AmortizationLine>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private creditService: CreditService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.simulation$.subscribe((sim) => {
      if (sim) {        
        this.currentSim = sim;
        this.onSimulationResult(sim);
        this.form.patchValue({
          montant: sim.loanAmount,
          duree: sim.loanTermMonths,
          gracePeriod: sim.gracePeriodMonths,
        });
      }
    });
  }

  simulate(): void {
    if (this.form.invalid) return;

    const request: CreditSimulationRequest = {
      loanAmount: this.form.value.montant!,
      loanTermMonths: this.form.value.duree!,
      gracePeriodMonths: this.form.value.gracePeriod!,
    };

    this.loading = true;
    this.error = null;
    this.resultat = null;

    this.creditService.simulate(request).subscribe({
      next: (res) => {
        this.loading = false;
        this.onSimulationResult(res);
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors de la simulation du crédit.';
        this.loading = false;
      },
    });
  }

  onSimulationResult(result: CreditSimulationResponse) {
    this.resultat = result;
    this.dataSource.data = result.schedule;

    // Refresh paginator
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.paginator.firstPage();
      }
    });
  }
  saveSimulation(action: any): void {
    if (!this.resultat) return;

    const customerId = 1; // TODO: use real value

    this.saving = true;
    if(this.currentSim) this.resultat.id = this.currentSim.id;
    this.creditService.saveSimulation(customerId, this.resultat).subscribe({
      next: () => {
        this.saving = false;
        if (action) {
          this.goToLoanRequest();
        } else {
          this.router.navigate(['/simulations-history']);
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erreur lors de l’enregistrement.';
        this.saving = false;
      },
    });
  }
  goToLoanRequest() {
    if (this.resultat) {
      this.sharedService.setSimulation(this.resultat);
      this.router.navigate(['/loan-request']);
    }
  }
}
