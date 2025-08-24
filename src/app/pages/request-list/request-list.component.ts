import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoanRequest } from 'src/app/entities/loan-request.entity';
import { LoanRequestService } from 'src/app/services/loan-request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.scss']
})
export class RequestListComponent implements OnInit {

  displayedColumns: string[] = ['creditType', 'accountNumber', 'loanAmount', 'loanDuration', 'libelle', 'actions'];
  dataSource: MatTableDataSource<LoanRequest> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private loanRequestService: LoanRequestService) {}

  ngOnInit(): void {
    this.loadLoanRequests();
  }

  loadLoanRequests() {
    // Replace 1 with dynamic customerId if needed
    this.loanRequestService.getLoanRequestsByCustomer(1).subscribe({
      next: (requests) => {
        this.dataSource = new MatTableDataSource(requests);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error(err)
    });
  }

  onEdit(loan: LoanRequest) {
    console.log('Edit loan request', loan);
    // You can navigate to edit page or open modal here
  }

  onView(loan: LoanRequest) {
    console.log('View loan request', loan);
    // Open detail modal or page
  }

}
