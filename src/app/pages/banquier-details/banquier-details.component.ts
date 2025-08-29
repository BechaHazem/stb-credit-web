import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Banquier, BanquierServiceService } from 'src/app/services/Banquier/banquier-service.service';
import { BanquierAddDialogComponent } from '../banquier-add-dialog/banquier-add-dialog.component';


export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  productName: string;
  budget: number;
  priority: string;
}



  const ELEMENT_DATA: productsData[] = [
    {
      id: 1,
      imagePath: 'assets/images/profile/user-1.jpg',
      uname: 'Sunil Joshi',
      position: 'Web Designer',
      productName: 'Elite Admin',
      budget: 3.9,
      priority: 'low',
    },
    {
      id: 2,
      imagePath: 'assets/images/profile/user-2.jpg',
      uname: 'Andrew McDownland',
      position: 'Project Manager',
      productName: 'Real Homes Theme',
      budget: 24.5,
      priority: 'medium',
    },
    {
      id: 3,
      imagePath: 'assets/images/profile/user-3.jpg',
      uname: 'Christopher Jamil',
      position: 'Project Manager',
      productName: 'MedicalPro Theme',
      budget: 12.8,
      priority: 'high',
    },
    {
      id: 4,
      imagePath: 'assets/images/profile/user-4.jpg',
      uname: 'Nirav Joshi',
      position: 'Frontend Engineer',
      productName: 'Hosting Press HTML',
      budget: 2.4,
      priority: 'critical',
    },
  ];



@Component({
  selector: 'app-banquier-details',
  templateUrl: './banquier-details.component.html',
  styleUrls: ['./banquier-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  
})

export class BanquierDetailsComponent implements OnInit {
  displayedColumns = ['assigned', 'name', 'priority', 'budget','actions'];
  dataSource: Banquier[] = [];

  constructor(
    private banquierService: BanquierServiceService , 
    private dialog: MatDialog
) {}

  ngOnInit() {
    this.banquierService.getAll().subscribe(data => (this.dataSource = data));
  }
  refreshList() {
  this.banquierService.getAll().subscribe(data => (this.dataSource = data));
}

  addBanquier() {
  const ref = this.dialog.open(BanquierAddDialogComponent, { width: '450px' });
  ref.afterClosed().subscribe(ok => {
    if (ok) this.banquierService.getAll().subscribe(data => (this.dataSource = data));
  });
}
deleteBanquier(id: number) {
  if (confirm('Are you sure you want to delete this banker?')) {
    this.banquierService.delete(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(b => b.id !== id);
    });
  }
}
editBanquier(b: Banquier) {
  const ref = this.dialog.open(BanquierAddDialogComponent, {
    width: '450px',
    data: b   // <-- pass current banker
  });

  ref.afterClosed().subscribe(result => {
    if (result) {
      this.banquierService.update(b.id, result).subscribe(() => {
                this.refreshList();        // reload after update

      });
    }
  });
}

}

