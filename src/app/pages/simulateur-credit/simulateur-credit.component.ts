import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-simulateur-credit',
  templateUrl: './simulateur-credit.component.html',
  styleUrls: ['./simulateur-credit.component.scss'],
})
export class SimulateurCreditComponent {
  form = this.fb.group({
    montant: [null, [Validators.required, Validators.min(1000)]],
    duree: [null, [Validators.required, Validators.min(1)]],
  });

  resultat: number | null = null;

  constructor(private fb: FormBuilder) {}

  simulate(): void {
    if (this.form.invalid) return;
    const montant = this.form.value.montant!;
    const duree = this.form.value.duree!;
    // simple linear example
    this.resultat = (montant * 1.05) / duree;
  }
}
