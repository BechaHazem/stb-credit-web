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
