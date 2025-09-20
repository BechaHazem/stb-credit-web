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
  public role !:string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private loanRequestService: LoanRequestService, private router :Router,    private sharedService: SharedService) {}

  ngOnInit(): void {
    this.role = this.sharedService.getAccount().role;
    this.loadLoanRequests();
  }

  loadLoanRequests() {
    if(this.role == 'CLIENT'){
    this.loanRequestService.getLoanRequestsByCustomer(this.sharedService.getCustomer().id).subscribe({
      next: (requests) => {
        this.dataSource = new MatTableDataSource(requests);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error(err)
    });
    } else {
          this.loanRequestService.getLoanRequestsAgence(this.sharedService.getAccount().agence).subscribe({
      next: (requests) => {
        this.dataSource = new MatTableDataSource(requests);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error(err)
    });     
    }
  }

  onEdit(loan: LoanRequest) {
      if (!loan) {
        return;
  }
  this.sharedService.setLoanRequest(loan)
  switch (loan.step) {
    case 0 : 
          
      this.router.navigate(['/loan-request'], {
      queryParams: { mode: 'review' },
    });
      break;
    case 1:
      this.router.navigate(['/loan/sign-pre-contract'], {
      queryParams: { mode: 'review' },
    });
      break;

      case 2:
      this.router.navigate(['/loan/check-score']);
      break;

    case 3:
      this.router.navigate(['/loan/upload-documents']);
      break;



    case 4:
      this.router.navigate(['/loan/summary', loan.id]);
      break;

    default:
      console.warn("Unknown loan step:", loan.step);
      this.router.navigate(['/loan/details', loan.id]);
  }
  }

  onView(loan: LoanRequest) {
    this.sharedService.setLoanRequest(loan)
    this.router.navigate(['schedule'])
  }

}
