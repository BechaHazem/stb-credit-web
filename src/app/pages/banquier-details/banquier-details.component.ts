import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Banquier, BanquierServiceService } from 'src/app/services/Banquier/banquier-service.service';


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
  displayedColumns = ['assigned', 'name', 'priority', 'budget'];
  dataSource: Banquier[] = [];

  constructor(private banquierService: BanquierServiceService) {}

  ngOnInit() {
    this.banquierService.getAll().subscribe(data => (this.dataSource = data));
  }
}

