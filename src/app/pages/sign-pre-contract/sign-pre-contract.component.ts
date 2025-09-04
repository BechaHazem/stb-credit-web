// src/app/components/sign-pre-contract/sign-pre-contract.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Document } from 'src/app/entities/document.entity';
import { LoanRequest } from 'src/app/entities/loan-request.entity';
import { DocumentService } from 'src/app/services/document.service';
import { LoanRequestService } from 'src/app/services/loan-request.service';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-sign-pre-contract',
  templateUrl: './sign-pre-contract.component.html',
  styleUrls: ['./sign-pre-contract.component.scss']
})
export class SignPreContractComponent implements OnInit {
  documents: Document[] = [];
  isLoading = false;
  public role !:string;
  public loan !: LoanRequest
  constructor(
    private sharedService: SharedService,
    private documentService: DocumentService,
    private router: Router,
        private loanService: LoanRequestService
  ) {}

  ngOnInit(): void {
    this.role = this.sharedService.getAccount().role;
     this.loan = this.sharedService.getLoanRequest();
    if (this.loan) {
      this.loadDocuments(this.loan);
    }
  }

  loadDocuments(loan : LoanRequest) {
    this.isLoading = true;
    let doc = new Document();
    if (loan.customer?.id) doc.customerId = loan.customer?.id;
    if (loan?.id) doc.loanRequestId = loan.id ;
    
    this.documentService.findByLoanAndCustomer(doc).subscribe({
      next: (docs) => {
        this.documents = docs;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load documents', err);
        this.isLoading = false;
      }
    });
  }

  viewDocument(doc: Document) {
    if (doc.fileBytes) {
      const blob = this.base64ToBlob(doc.fileBytes, 'application/pdf');
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    }
  }

  private base64ToBlob(base64: string, mime: string) {
    const byteChars = atob(base64);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) {
      byteNumbers[i] = byteChars.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mime });
  }
  nextStep(){
    if (this.loan?.id !== undefined) {
      this.loan.step = 2 ;
      this.loan.libelle = 'check-score';
  this.loanService.updateLoanRequest(this.loan.id,this.loan).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: (err) => console.error(err)
    });     
}
}
}
