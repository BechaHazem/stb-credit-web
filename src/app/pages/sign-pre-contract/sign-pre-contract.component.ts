// src/app/components/sign-pre-contract/sign-pre-contract.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Document } from 'src/app/entities/document.entity';
import { LoanRequest } from 'src/app/entities/loan-request.entity';
import { Signature } from 'src/app/entities/signature.entity';
import { DocumentService } from 'src/app/services/document.service';
import { LoanRequestService } from 'src/app/services/loan-request.service';
import { SignatureServiceService } from 'src/app/services/Signature/signature-service.service';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-sign-pre-contract',
  templateUrl: './sign-pre-contract.component.html',
  styleUrls: ['./sign-pre-contract.component.scss']
})
export class SignPreContractComponent implements OnInit {
  documents: Document[] = [];
  isLoading = false;
  public role !: string;
  public loan !: LoanRequest

  // Pour la signature
  signatureFile!: File | null;
  signaturePreview: string | null = null;

  isSigned = false;


  constructor(
    private sharedService: SharedService,
    private documentService: DocumentService,
    private router: Router,
    private loanService: LoanRequestService,
    private signatureService: SignatureServiceService

  ) { }

  ngOnInit(): void {
    this.role = this.sharedService.getAccount().role;
    this.loan = this.sharedService.getLoanRequest();
    console.log(this.loan.id);
    if (this.loan) {
      this.loadDocuments(this.loan);
      this.loadActiveSignature();   // <-- new

    }
  }

  loadDocuments(loan: LoanRequest) {
    this.isLoading = true;
    let doc = new Document();
    if (loan.customer?.id) doc.customerId = loan.customer?.id;
    if (loan?.id) doc.loanRequestId = loan.id;

    this.documentService.findByLoanAndCustomer(doc).subscribe({
      next: (docs) => {
        this.documents = docs;
        this.isSigned = docs.some(d => d.name.includes('Signed')); // or your own status field
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
  nextStep() {
    if (this.loan?.id !== undefined) {
      this.loan.step = 2;
      this.loan.libelle = 'check-score';
      this.loanService.updateLoanRequest(this.loan.id, this.loan).subscribe({
        next: () => {
          this.router.navigate(['/'])
        },
        error: (err) => console.error(err)
      });
    }
  }
  // === Nouvelle partie pour la signature ===
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.signatureFile = input.files[0];

      // Générer une preview
      const reader = new FileReader();
      reader.onload = () => {
        this.signaturePreview = reader.result as string;
      };
      reader.readAsDataURL(this.signatureFile);
    }
  }

  saveSignature() {
    if (!this.signatureFile || !this.loan?.id) return;

    // 1. Upload de la signature
    this.signatureService.uploadSignature(this.signatureFile).subscribe({
      next: (uploadedSig: Signature) => {
        console.log("Uploaded signature:", uploadedSig);

        if (!this.loan?.id) {
          console.error("LoanRequest id is missing");
          return;
        }

        this.signatureService.attachSignature(this.loan.id, uploadedSig.signatureUrl).subscribe({
          next: () => {
            alert("Contract signed successfully!");
          },
          error: (err) => console.error("Error attaching signature:", err)
        });

      },
      error: (err) => console.error("Error uploading signature:", err)
    });
  }
loadActiveSignature() {
  this.signatureService.getMySignature().subscribe({
    next: (sig: Signature | null) => {
      if (sig) {
        this.signaturePreview = sig.signatureUrl;
        // create a real File from the preview so the input is populated
        this.urlToFile(sig.signatureUrl, 'signature.png', 'image/png')
          .then(file => this.signatureFile = file)
          .catch(() => this.signatureFile = null);
      } else {
        this.signaturePreview = null;
        this.signatureFile = null;
      }
    },
    error: () => {
      this.signaturePreview = null;
      this.signatureFile = null;
    }
  });
}

private async urlToFile(url: string, filename: string, mimeType: string): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], filename, { type: mimeType });
}
}
