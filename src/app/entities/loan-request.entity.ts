import { Customer } from "./customer.entity";

export class LoanRequest {
  id?: number;

  // Relations
  customerId!: number;       // foreign key reference
  customer?: Customer;       // object reference (optional)

  // Loan details
  creditType!: string;
  agence!: string;
  accountNumber!: string;

  loanPurpose!: string;
  loanAmount!: number;
  loanDuration!: number;
  gracePeriod?: number;

  // Documents
  documents?: string; // could store JSON or comma-separated list
  acceptTerms!: boolean;

  // Workflow
  step!: number;
  libelle!: string;

  // Links with simulations if any
  simulationId?: number;
}
