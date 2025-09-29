import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  STB_AGENCES = [
  { id: 1, name: "Agence Tunis Siège", city: "Tunis" },
  { id: 2, name: "Agence Tunis Belvédère", city: "Tunis" },
  { id: 3, name: "Agence Tunis Montplaisir", city: "Tunis" },
  { id: 4, name: "Agence Tunis Lafayette", city: "Tunis" },
  { id: 5, name: "Agence Tunis El Manar", city: "Tunis" },
  { id: 6, name: "Agence Ariana", city: "Ariana" },
  { id: 7, name: "Agence La Marsa", city: "La Marsa" },
  { id: 8, name: "Agence La Goulette", city: "La Goulette" },
  { id: 9, name: "Agence Bizerte", city: "Bizerte" },
  { id: 10, name: "Agence Nabeul", city: "Nabeul" },
  { id: 11, name: "Agence Hammamet", city: "Nabeul" },
  { id: 12, name: "Agence Sousse", city: "Sousse" },
  { id: 13, name: "Agence Sousse Corniche", city: "Sousse" },
  { id: 14, name: "Agence Monastir", city: "Monastir" },
  { id: 15, name: "Agence Mahdia", city: "Mahdia" },
  { id: 16, name: "Agence Sfax", city: "Sfax" },
  { id: 17, name: "Agence Sfax Ville", city: "Sfax" },
  { id: 18, name: "Agence Gabès", city: "Gabès" },
  { id: 19, name: "Agence Médenine", city: "Médenine" },
  { id: 20, name: "Agence Djerba Houmt Souk", city: "Djerba" },
  { id: 21, name: "Agence Tataouine", city: "Tataouine" },
  { id: 22, name: "Agence Gafsa", city: "Gafsa" },
  { id: 23, name: "Agence Kasserine", city: "Kasserine" },
  { id: 24, name: "Agence Kairouan", city: "Kairouan" },
  { id: 25, name: "Agence Beja", city: "Beja" },
  { id: 26, name: "Agence Jendouba", city: "Jendouba" },
  { id: 27, name: "Agence Kef", city: "Kef" },
  { id: 28, name: "Agence Siliana", city: "Siliana" },
  { id: 29, name: "Agence Zaghouan", city: "Zaghouan" },
  { id: 30, name: "Agence Manouba", city: "Manouba" },
];
  creditTypes = [
    'Crédit direct',
    'Crédit de consommation',
    'Prêt computer',
    'Crédit réaménagement',
  ];
  mode !: string | null;
  loan !: LoanRequest;
  // documents = [
  //   'Fiche de paie ou de pension',
  //   'Facture Proforma',
  //   'Photocopie de la carte grise',
  //   'Certificat d’enrôlement',
  //   'Jeu de plans approuvés',
  //   'Certificat de propriété',
  //   'Devis travaux',
  //   'Déclaration de revenus',
  //   'Promesse de vente',
  //   'Titre foncier',
  //   'Autorisation de bâtir',
  //   'Devis descriptif',
  //   'Agrément du promoteur',
  // ];
  public role !:string;
  public customer !: Customer;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private loanService: LoanRequestService,
    private router: Router,
      private snackBar: MatSnackBar,
          private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    
    this.role = this.sharedService.getAccount().role;
    this.customer = this.sharedService.getCustomer();
this.sharedService.simulation$.subscribe(sim => {
  this.simulation = sim;
});

    this.loanForm = this.fb.group({
      agence: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.minLength(14)]],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idType: ['', Validators.required],
      idNumber: ['', Validators.required],
      idIssueDate: ['', Validators.required],
        age: [0, [Validators.required, Validators.min(18), Validators.max(100)]],
  monthlyIncome: [0, [Validators.required, Validators.min(0)]],
  monthlyExpenses: [0, Validators.min(0)],
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

    this.mode = this.route.snapshot.queryParamMap.get('mode');
    
  if (this.mode === 'review') {
     this.loan = this.sharedService.getLoanRequest();
    if (this.loan) {
      this.patchForm(this.loan);
    }
  } else if (this.customer){
    this.setCustomer(this.customer)
  }

  }


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
  id:0,
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
  accountNumber: this.loanForm.value.accountNumber,
    age: this.loanForm.value.age,
  monthlyIncome: this.loanForm.value.monthlyIncome,
  monthlyExpenses: this.loanForm.value.monthlyExpenses,
};
if(this.mode == 'review' && this.loan?.customer?.id){
  customerPayload.id = this.loan?.customer?.id;
} else {
  customerPayload.id = this.sharedService.getCustomer().id
}

const loanRequestPayload: LoanRequest = {
  customerId : this.mode == 'review' ? this.loan.customerId : this.sharedService.getCustomer().id,
  creditType: this.loanForm.value.creditType,
  agence:this.loanForm.value.agence,
  accountNumber: this.mode == 'review' ? this.loan.accountNumber : '',
  loanPurpose: this.loanForm.value.loanPurpose,
  loanAmount: this.loanForm.value.loanAmount,
  loanDuration: this.loanForm.value.loanDuration,
  gracePeriod: this.loanForm.value.gracePeriod,
  // documents: this.loanForm.value.documents
  //   .map((checked: boolean, i: number) => checked ? this.documents[i] : null)
  //   .filter((v: string | null) => v !== null)
  //   .join(','),
  acceptTerms: this.loanForm.value.acceptTerms,
  simulationId: this.simulation?.id,
  step: this.mode == 'review' ? 1 : 0,
  libelle: this.mode == 'review' ? 'sign-pre-contract' : 'pending',
  customer: customerPayload, 
};
return loanRequestPayload;
}

private patchForm(loan: LoanRequest): void {
  this.loanForm.patchValue({
    creditType: loan.creditType,
    agence: loan.agence,
    // accountNumber: loan.accountNumber,
    loanPurpose: loan.loanPurpose,
    loanAmount: loan.loanAmount,
    loanDuration: loan.loanDuration,
    gracePeriod: loan.gracePeriod,
    acceptTerms: loan.acceptTerms,
    step: loan.step,
    libelle: loan.libelle
  });

  // customer section
  const c = loan.customer;
  if (c) {
    this.setCustomer(c)
  }
}
setCustomer(c :Customer){
  
      this.loanForm.patchValue({
      fullName: c.fullName,
      email: c.email,
      idType: c.idType,
      idNumber: c.idNumber,
      idIssueDate: c.idIssueDate,
      fiscalNumber: c.fiscalNumber,
      employer: c.employer,
      profession: c.profession,
      address: c.address,
      city: c.city,
      postalCode: c.postalCode,
      phone: c.phone,
      spouseName: c.spouseName,
      spouseEmail: c.spouseEmail,
      spouseIdType: c.spouseIdType,
      spouseIdNumber: c.spouseIdNumber,
      spouseIdIssueDate: c.spouseIdIssueDate,
      spouseFiscalNumber: c.spouseFiscalNumber,
      spouseEmployer: c.spouseEmployer,
      spouseProfession: c.spouseProfession,
      spouseAddress: c.spouseAddress,
      spouseCity: c.spouseCity,
      spousePostalCode: c.spousePostalCode,
      spousePhone: c.spousePhone,
      accountNumber: c.accountNumber,
          age: c.age,
    monthlyIncome: c.monthlyIncome,
    monthlyExpenses: c.monthlyExpenses,
    });
}
accept(){
    if (this.loanForm.invalid) return;

    if (this.loan?.id !== undefined) {
    const payload = this.buildPayload();
    payload.id = this.loan?.id;

          
  this.loanService.updateLoanRequest(this.loan.id,payload).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: (err) => console.error(err)
    });     
}
}
}
