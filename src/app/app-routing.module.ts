import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { SimulateurCreditComponent } from './pages/simulateur-credit/simulateur-credit.component';
import { authGuard } from './guards/auth.guard';
import { BanquierDetailsComponent } from './pages/banquier-details/banquier-details.component';
import { SimulationsHistoryComponent } from './pages/simulations-history/simulations-history.component';
import { LoansRequestComponent } from './pages/loans-request/loans-request.component';
import { RequestListComponent } from './pages/request-list/request-list.component';
import { ProductsDetailsComponent } from './pages/products-details/products-details.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
        canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
      {
        path: 'credit-simulation',
        component: SimulateurCreditComponent,
      },
      {
        path: 'Banquier-details',
        component: BanquierDetailsComponent,
      },
      {
        path: 'simulations-history',
        component: SimulationsHistoryComponent,
      },
            {
        path: 'loan-request',
        component: LoansRequestComponent,
      },

            {
        path: 'request-list',
        component: RequestListComponent,
      },
      {
        path : "Products-details",
        component: ProductsDetailsComponent,
      }
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
