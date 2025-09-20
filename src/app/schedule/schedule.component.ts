import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared/shared.service';
import { LoanRequest } from '../entities/loan-request.entity';
import { MatTableDataSource } from '@angular/material/table';
import { CreditService } from '../services/credit.service';
import { AmortizationLine } from '../entities/credit-simulation.entity';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  displayedColumns: string[] = [
    'period',
    'openingBalance',
    'payment',
    'interest',
    'principal',
    'closingBalance',
  ];
  dataSource = new MatTableDataSource<AmortizationLine>([]);

  simulation: any;
  simulationId!: number;
  loan !: LoanRequest
  constructor(
    private route: ActivatedRoute,
 private creditService: CreditService,    private sharedService : SharedService
  ) {}

    ngOnInit(): void {
    this.loan = this.sharedService.getLoanRequest();
    const id = this.loan?.simulationId;

    if (id) {
      this.creditService.getSimulation(id).subscribe(res => {
        this.simulation = res;
        this.dataSource.data = res.schedule || [];
      });
    }
  }
}
