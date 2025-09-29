import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { creditType } from 'src/app/entities/Credit-Type.entity';
import { CreditTypeService } from 'src/app/services/credit-Type/credit-type.service';

@Component({
  selector: 'app-type-credit-add',
  templateUrl: './type-credit-add.component.html',
  styleUrls: ['./type-credit-add.component.scss']
})
export class TypeCreditAddComponent implements OnInit {
  form = this.fb.group({
    type: ['', Validators.required],
    apr: [0, [Validators.required, Validators.min(0), Validators.max(1)]], // ex: 0.07
  });

  constructor(
    private fb: FormBuilder,
    private service: CreditTypeService,
    private ref: MatDialogRef<TypeCreditAddComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public current?: creditType,
  ) {}

  ngOnInit(): void {
    if (this.current) {
      this.form.patchValue({
        type: this.current.type,
        apr: this.current.apr,
      });
    }
  }

  cancel() { this.ref.close(); }

  save() {
    if (this.form.invalid) return;

const dto =   {
  type: this.form.value.type!,
  apr: this.form.value.apr!,
};
    const call = this.current
      ? this.service.update(this.current.id, dto) // edit
      : this.service.create(dto);                 // add

    call.subscribe(() => {
      const msg = this.current ? 'Credit Type updated' : 'Credit Type added';
      this.snack.open(msg, '✔', { duration: 2500 });
      this.ref.close(dto);
    });
  }
}
