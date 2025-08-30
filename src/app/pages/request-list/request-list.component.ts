import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoanRequest } from 'src/app/entities/loan-request.entity';
import { LoanRequestService } from 'src/app/services/loan-request.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {

  displayedColumns: string[] = ['creditType', 'accountNumber', 'loanAmount', 'loanDuration', 'libelle', 'actions'];
  dataSource: MatTableDataSource<LoanRequest> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private loanRequestService: LoanRequestService, private router :Router,    private sharedService: SharedService) {}

  ngOnInit(): void {
    this.loadLoanRequests();
  }

  loadLoanRequests() {
    // Replace 1 with dynamic customerId if needed
    this.loanRequestService.getLoanRequestsByCustomer(this.sharedService.getCustomer().id).subscribe({
      next: (requests) => {
        this.dataSource = new MatTableDataSource(requests);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error(err)
    });
  }

  onEdit(loan: LoanRequest) {
      if (!loan || !loan.step) {
    console.error("Loan step not found");
    return;
  }

  switch (loan.step) {
    case 1:
      // Navigate to sign-pre-contract
      this.sharedService.setLoanRequest(loan)
      this.router.navigate(['/loan/sign-pre-contract']);
      break;

    case 2:
      // Example: go to document upload step
      this.router.navigate(['/loan/upload-documents', loan.id]);
      break;

    case 3:
      // Example: go to approval step
      this.router.navigate(['/loan/approval', loan.id]);
      break;

    case 4:
      // Example: go to summary
      this.router.navigate(['/loan/summary', loan.id]);
      break;

    default:
      console.warn("Unknown loan step:", loan.step);
      this.router.navigate(['/loan/details', loan.id]);
  }
  }

  onView(loan: LoanRequest) {
    console.log('View loan request', loan);
    // Open detail modal or page
  }

}
