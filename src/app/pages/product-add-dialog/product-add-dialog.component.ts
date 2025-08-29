import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductRequest } from 'src/app/services/Products/product-service.service';

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.scss']
})
export class ProductAddDialogComponent implements OnInit {
  form = this.fb.group({
    code: ['', [Validators.required]],
    description: ['', [Validators.required]],
    rate: [0, [Validators.required, Validators.min(0.01)]],
    minimumAmount: [0, [Validators.required, Validators.min(0.01)]],
    maximumAmount: [0, [Validators.required, Validators.min(0.01)]],
    minimumTerm: [0, [Validators.required, Validators.min(1)]],
    maximumTerm: [0, [Validators.required, Validators.min(1)]],
    minimumAge: [0, [Validators.required, Validators.min(1)]],
    maximumAge: [0, [Validators.required, Validators.min(1)]],
    minimumDeferredPeriod: [0, [Validators.required, Validators.min(0)]],
    maximumDeferredPeriod: [0, [Validators.required, Validators.min(0)]],
    issueFeeAmount1: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private fb: FormBuilder,
    private ref: MatDialogRef<ProductAddDialogComponent>,
    private snack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public current?: any
  ) {}

  ngOnInit(): void {
    if (this.current) {
      this.form.patchValue(this.current);
    }
  }

  cancel() {
    this.ref.close();
  }

save() {
  if (this.form.invalid) return;

  const raw = this.form.getRawValue();
  const payload: ProductRequest = {
    code: raw.code!,
    description: raw.description!,
    rate: raw.rate!,
    minimumAmount: raw.minimumAmount!,
    maximumAmount: raw.maximumAmount!,
    minimumTerm: raw.minimumTerm!,
    maximumTerm: raw.maximumTerm!,
    minimumAge: raw.minimumAge!,
    maximumAge: raw.maximumAge!,
    minimumDeferredPeriod: raw.minimumDeferredPeriod!,
    maximumDeferredPeriod: raw.maximumDeferredPeriod!,
    issueFeeAmount1: raw.issueFeeAmount1!
  };
  this.ref.close(payload);
}}
