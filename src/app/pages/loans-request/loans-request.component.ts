import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Customer } from 'src/app/entities/customer.entity';
import { LoanRequest } from 'src/app/entities/loan-request.entity';
import { LoanRequestService } from 'src/app/services/loan-request.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-loans-request',
  templateUrl: './loans-request.component.html',
  styleUrls: ['./loans-request.component.scss']
})
export class LoansRequestComponent implements OnInit{

  loanForm!: FormGroup;
  simulation: any;

  creditTypes = [
    'Crédit direct',
    'Crédit de consommation',
    'Prêt auto',
    'Prêt computer',
    'Crédit réaménagement',
    'Prêt épargne logement',
    'Prêt épargne confort',
    'Autre',
  ];

  documents = [
    'Fiche de paie ou de pension',
    'Facture Proforma',
    'Photocopie de la carte grise',
    'Certificat d’enrôlement',
    'Jeu de plans approuvés',
    'Certificat de propriété',
    'Devis travaux',
    'Déclaration de revenus',
    'Promesse de vente',
    'Titre foncier',
    'Autorisation de bâtir',
    'Devis descriptif',
    'Agrément du promoteur',
  ];

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private loanService: LoanRequestService,
    private router: Router,
      private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
this.sharedService.simulation$.subscribe(sim => {
  this.simulation = sim;
});

    this.loanForm = this.fb.group({
      creditType: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.minLength(14)]],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idType: ['', Validators.required],
      idNumber: ['', Validators.required],
      idIssueDate: ['', Validators.required],
      fiscalNumber: [''],
      employer: [''],
      profession: [''],
      address: [''],
      city: [''],
      postalCode: [''],
      phone: [''],
      spouseName: [''],
      spouseEmail: [''],
      spouseIdType: [''],
      spouseIdNumber: [''],
      spouseIdIssueDate: [''],
      spouseFiscalNumber: [''],
      spouseEmployer: [''],
      spouseProfession: [''],
      spouseAddress: [''],
      spouseCity: [''],
      spousePostalCode: [''],
      spousePhone: [''],
      loanPurpose: [''],
      loanAmount: [this.simulation?.loanAmount, Validators.required],
      loanDuration: [this.simulation?.loanTermMonths, Validators.required],
      gracePeriod: [this.simulation?.gracePeriodMonths],
      documents: this.fb.array([]),
      acceptTerms: [false, Validators.requiredTrue],
    });

    // init documents checkboxes
    this.documents.forEach(() => {
      (this.loanForm.get('documents') as FormArray).push(this.fb.control(false));
    });
  }

  // get documentsArray(): FormArray {
  //   return this.loanForm.get('documents') as FormArray;
  // }

submit(): void {
  if (this.loanForm.invalid) return;

  const payload = this.buildPayload();

  this.loanService.createLoanRequest(payload).subscribe({
    next: () => {
     this.snackBar.open('Demande de crédit enregistrée avec succès.', 'Fermer', {
  duration: 4000,
  horizontalPosition: 'end',  // 'start' | 'center' | 'end' | 'left' | 'right'
  verticalPosition: 'top',    // 'top' | 'bottom'
  panelClass: ['toast-success'], // custom styles
});

      this.router.navigate(['/request-list']);
    },
    error: (err) => {
      console.error(err);
      this.snackBar.open('Erreur lors de la création de la demande.', 'Fermer', {
        duration: 4000,
        panelClass: ['toast-error'], 
      });
    },
  });
}
  get documentsArray(): FormArray {
  return this.loanForm.get('documents') as FormArray;
}

getDocumentControl(index: number): FormControl {
  return this.documentsArray.at(index) as FormControl;
}
buildPayload(){
  const customerPayload : Customer = {
    id : this.sharedService.getCustomer().id,
  fullName: this.loanForm.value.fullName,
  email: this.loanForm.value.email,
  idType: this.loanForm.value.idType,
  idNumber: this.loanForm.value.idNumber,
  idIssueDate: this.loanForm.value.idIssueDate,
  fiscalNumber: this.loanForm.value.fiscalNumber,
  employer: this.loanForm.value.employer,
  profession: this.loanForm.value.profession,
  address: this.loanForm.value.address,
  city: this.loanForm.value.city,
  postalCode: this.loanForm.value.postalCode,
  phone: this.loanForm.value.phone,
  spouseName: this.loanForm.value.spouseName,
  spouseEmail: this.loanForm.value.spouseEmail,
  spouseIdType: this.loanForm.value.spouseIdType,
  spouseIdNumber: this.loanForm.value.spouseIdNumber,
  spouseIdIssueDate: this.loanForm.value.spouseIdIssueDate,
  spouseFiscalNumber: this.loanForm.value.spouseFiscalNumber,
  spouseEmployer: this.loanForm.value.spouseEmployer,
  spouseProfession: this.loanForm.value.spouseProfession,
  spouseAddress: this.loanForm.value.spouseAddress,
  spouseCity: this.loanForm.value.spouseCity,
  spousePostalCode: this.loanForm.value.spousePostalCode,
  spousePhone: this.loanForm.value.spousePhone,
};

const loanRequestPayload: LoanRequest = {
  customerId : this.sharedService.getCustomer().id,
  creditType: this.loanForm.value.creditType,
  accountNumber: this.loanForm.value.accountNumber,
  loanPurpose: this.loanForm.value.loanPurpose,
  loanAmount: this.loanForm.value.loanAmount,
  loanDuration: this.loanForm.value.loanDuration,
  gracePeriod: this.loanForm.value.gracePeriod,
  documents: this.loanForm.value.documents
    .map((checked: boolean, i: number) => checked ? this.documents[i] : null)
    .filter((v: string | null) => v !== null)
    .join(','),
  acceptTerms: this.loanForm.value.acceptTerms,
  simulationId: this.simulation?.id,
  step: 1,
  libelle: 'sign-pre-contract',
  customer: customerPayload, // nested object
};
return loanRequestPayload;
}
}
