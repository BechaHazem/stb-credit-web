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
import { creditType } from 'src/app/entities/Credit-Type.entity';
import { CreditTypeService } from 'src/app/services/credit-Type/credit-type.service';
import { CreditService } from 'src/app/services/credit.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-simulateur-credit',
  templateUrl: './simulateur-credit.component.html',
  styleUrls: ['./simulateur-credit.component.scss'],
})
export class SimulateurCreditComponent implements OnInit {
  form = this.fb.group({
    montant: [0, [Validators.required, Validators.min(1000), Validators.max(20000)]],
    duree: [0, [Validators.required, Validators.min(2), Validators.max(36)]],
    gracePeriod: [0, [Validators.min(0), Validators.max(1)]],
    creditType: [null as creditType | null, Validators.required] // ➜ object

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
  creditTypes: creditType[] = [];


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private creditService: CreditService,
    private router: Router,
    private sharedService: SharedService,
    private creditTypeService: CreditTypeService,

  ) { }

ngOnInit(): void {
  this.creditTypeService.getAll().subscribe(types => {
    this.creditTypes = types;
    console.log('✅ Credit types loaded:', types);

    this.sharedService.simulation$.subscribe(sim => {
      if (!sim) return;
      
      this.currentSim = sim;
      this.onSimulationResult(sim);

      const type = sim.creditType || null;
      
      console.log('🔍 Patching with creditType:', type);
      console.log('📋 Available creditTypes:', this.creditTypes);
      console.log('🎯 Is patching type in available types?', 
        this.creditTypes.some(t => t.id === type?.id));

      this.form.patchValue({
        montant: sim.loanAmount,
        duree: sim.loanTermMonths,
        gracePeriod: sim.gracePeriodMonths,
        creditType: type
      });
    });
  });
}
  compareCreditTypes(type1: creditType | null, type2: creditType | null): boolean {
    // If both are null/undefined, consider them equal
    if (!type1 && !type2) return true;

    // If one is null/undefined and the other isn't, they're not equal
    if (!type1 || !type2) return false;

    // Compare by ID (most reliable)
    if (type1.id !== undefined && type2.id !== undefined) {
      return type1.id === type2.id;
    }

    // Fallback to type name comparison
    if (type1.type && type2.type) {
      return type1.type === type2.type;
    }

    // Final fallback to reference equality
    return type1 === type2;
  }
  simulate(): void {
    if (this.form.invalid) return;
    const type = this.form.value.creditType;   // creditType | null
    if (!type) return;                         // extra guard


    const request: CreditSimulationRequest = {
      loanAmount: this.form.value.montant!,
      loanTermMonths: this.form.value.duree!,
      gracePeriodMonths: this.form.value.gracePeriod!,
      creditTypeId: type.id
    };

    this.loading = true;
    this.error = null;
    this.resultat = null;

    this.creditService.simulate(request).subscribe({
      next: (res) => {
        this.loading = false;
        this.onSimulationResult(res);
        console.log('Simulation result:', res);   // ✅ log the data
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

    const customerId = this.sharedService.getCustomer().id;

    this.saving = true;
    if (this.currentSim) this.resultat.id = this.currentSim.id;
    this.creditService.saveSimulation(customerId, this.resultat).subscribe({
      next: (res) => {
        this.saving = false;
        this.sharedService.setSimulation(res)
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
