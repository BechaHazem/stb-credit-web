export class Customer {
  id!: number;

  // Basic info
  fullName!: string;
  email!: string;
  phone!: string;

  // Identity
  idType!: string;
  idNumber!: string;
  idIssueDate!: Date;
  fiscalNumber!: string;

  // Professional info
  employer!: string;
  profession!: string;

  // Address
  address!: string;
  city!: string;
  postalCode!: string;

  // Spouse Info (optional)
  spouseName?: string;
  spouseEmail?: string;
  spousePhone?: string;
  spouseIdType?: string;
  spouseIdNumber?: string;
  spouseIdIssueDate?: Date;
  spouseFiscalNumber?: string;
  spouseEmployer?: string;
  spouseProfession?: string;
  spouseAddress?: string;
  spouseCity?: string;
  spousePostalCode?: string;
}
