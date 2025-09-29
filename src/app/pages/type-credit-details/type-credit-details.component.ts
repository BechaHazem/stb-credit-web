import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { creditType } from 'src/app/entities/Credit-Type.entity';
import { CreditTypeService } from 'src/app/services/credit-Type/credit-type.service';
import { TypeCreditAddComponent } from '../type-credit-add/type-credit-add.component';

@Component({
  selector: 'app-type-credit-details',
  templateUrl: './type-credit-details.component.html',
  styleUrls: ['./type-credit-details.component.scss']
})
export class TypeCreditDetailsComponent implements OnInit {
  
  displayedColumns = ['name', 'apr', 'actions'];
  dataSource: creditType[] = [];

  constructor(
    private creditTypeService: CreditTypeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.creditTypeService.getAll().subscribe(data => (this.dataSource = data));
  }

  addCreditType() {
    const ref = this.dialog.open(TypeCreditAddComponent, { width: '400px' });
    ref.afterClosed().subscribe(ok => {
      if (ok) this.refreshList();
    });
  }

  deleteCreditType(id: number) {
    if (confirm('Are you sure you want to delete this credit type?')) {
      this.creditTypeService.delete(id).subscribe(() => {
        this.dataSource = this.dataSource.filter(c => c.id !== id);
      });
    }
  }

  editCreditType(ct: creditType) {
    const ref = this.dialog.open(TypeCreditAddComponent, {
      width: '400px',
      data: ct
    });

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.creditTypeService.update(ct.id, result).subscribe(() => {
          this.refreshList();
        });
      }
    });
  }
}

