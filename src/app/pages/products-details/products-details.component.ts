import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product, ProductServiceService } from 'src/app/services/Products/product-service.service';
import { ProductAddDialogComponent } from '../product-add-dialog/product-add-dialog.component';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  displayedColumns = ['code', 'description', 'rate', 'amountRange', 'termRange', 'actions'];
  dataSource: Product[] = [];

  constructor(
    private productService: ProductServiceService,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.productService.getAll().subscribe(data => (this.dataSource = data));
  }

  addProduct() {
    this.openDialog();
  }

  editProduct(product: Product) {
    this.openDialog(product);
  }

  deleteProduct(id: number) {
    if (confirm('Delete this product?')) {
      this.productService.delete(id).subscribe(() => {
        this.snack.open('Product deleted', '✔', { duration: 2500 });
        this.load();
      });
    }
  }

  private openDialog(product?: Product) {
    const ref = this.dialog.open(ProductAddDialogComponent, {
      width: '500px',
      data: product
    });
    ref.afterClosed().subscribe(res => {
      if (!res) return;
      const call = product ? this.productService.update(product.id, res) : this.productService.create(res);
      call.subscribe(() => {
        const msg = product ? 'Product updated' : 'Product added';
        this.snack.open(msg, '✔', { duration: 2500 });
        this.load();
      });
    });
  }
}
