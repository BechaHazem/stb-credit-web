import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { SimulateurCreditComponent } from './simulateur-credit/simulateur-credit.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
    // children: [
    //   {
    //     path: 'simulateur-credit',
    //     component: SimulateurCreditComponent,
    //   },
    // ],
  },
];
