import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Banquier, BanquierServiceService } from 'src/app/services/Banquier/banquier-service.service';

@Component({
  selector: 'app-banquier-add-dialog',
  templateUrl: './banquier-add-dialog.component.html',
  styleUrls: ['./banquier-add-dialog.component.scss']
})
export class BanquierAddDialogComponent implements OnInit{
    form = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    agence: ['', [Validators.required]],
  });
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

constructor(
  private fb: FormBuilder,
  private service: BanquierServiceService,
  private ref: MatDialogRef<BanquierAddDialogComponent>,
  private snack: MatSnackBar,
  @Inject(MAT_DIALOG_DATA) public current?: Banquier,
) {}
    ngOnInit(): void {
    if (this.current) {
      this.form.patchValue({
        firstname: this.current.firstname,
        lastname:  this.current.lastname,
        email:     this.current.email,
        phone:     this.current.phone,
        agence:    this.current.agence
      });
    }
  }



  cancel() { this.ref.close(); }

 save() {
  if (this.form.invalid) return;

  const dto = {
    firstname: this.form.value.firstname!,
    lastname:  this.form.value.lastname!,
    email:     this.form.value.email!,
    phone:     this.form.value.phone!,
    agence:    this.form.value.agence!
  };
  const call = this.current
    ? this.service.update(this.current.id, dto)      // edit mode
    : this.service.create(dto);                      // add mode

  call.subscribe(() => {
    const msg = this.current ? 'Banquier updated' : 'Banquier added';
    this.snack.open(msg, '✔', { duration: 2500 });
    this.ref.close(dto);
  });
}


}
