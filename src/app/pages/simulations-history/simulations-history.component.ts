// src/app/components/simulations-history/simulations-history.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CreditSimulationResponse } from 'src/app/entities/credit-simulation.entity';
import { CreditService } from 'src/app/services/credit.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-simulations-history',
  templateUrl: './simulations-history.component.html',
  styleUrls: ['./simulations-history.component.scss'],
})
export class SimulationsHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'loanAmount',
    'loanTermMonths',
    'monthlyPayment',
    'totalCost',
    'totalInterest',
    'apr',
    'actions',
  ];
  dataSource = new MatTableDataSource<CreditSimulationResponse>([]);
  loading = true;
  error?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private creditService: CreditService,
    private sharedService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const customerId = 1; // TODO: inject / read from route / auth
    this.creditService.getCustomerSimulations(customerId).subscribe({
      next: (list) => {
        this.dataSource.data = list;
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Impossible de charger l’historique.';
        this.loading = false;
      },
    });
  }
  editSimulation(sim: CreditSimulationResponse) {
    this.sharedService.setSimulation(sim);
    this.router.navigate(['/credit-simulation']);
  }
}
