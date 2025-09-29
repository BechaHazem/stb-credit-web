import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { LoaderInterceptor } from './services/interceptor/loader/Loader.interceptor';
import { AuthExpiredInterceptor } from './services/interceptor/auth-expired.interceptor';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { SimulateurCreditComponent } from './pages/simulateur-credit/simulateur-credit.component';
import { BanquierDetailsComponent } from './pages/banquier-details/banquier-details.component';
import { RequestListComponent } from './pages/request-list/request-list.component';
import { LoansRequestComponent } from './pages/loans-request/loans-request.component';
import { SimulationsHistoryComponent } from './pages/simulations-history/simulations-history.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BanquierAddDialogComponent } from './pages/banquier-add-dialog/banquier-add-dialog.component';
import { ProductsDetailsComponent } from './pages/products-details/products-details.component';
import { ProductAddDialogComponent } from './pages/product-add-dialog/product-add-dialog.component';
import { SignPreContractComponent } from './pages/sign-pre-contract/sign-pre-contract.component';
import { CheckScoreComponent } from './pages/check-score/check-score.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { UploadDocumentComponent } from './pages/upload-document/upload-document.component';
import { AddDocumentsComponent } from './pages/add-documents/add-documents.component';
import { LoaderComponent } from './services/interceptor/loader/loader.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TypeCreditDetailsComponent } from './pages/type-credit-details/type-credit-details.component';
import { TypeCreditAddComponent } from './pages/type-credit-add/type-credit-add.component';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    SimulateurCreditComponent,
    BanquierDetailsComponent,
    SimulationsHistoryComponent,
    LoansRequestComponent,
    RequestListComponent,
    BanquierAddDialogComponent,
    ProductsDetailsComponent,
    ProductAddDialogComponent,
    SignPreContractComponent,
    LoaderComponent,
    CheckScoreComponent,
    UploadDocumentComponent,
    AddDocumentsComponent,
    ScheduleComponent,
    TypeCreditDetailsComponent,
    TypeCreditAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatSnackBarModule,
    TablerIconsModule.pick(TablerIcons),
    SignaturePadModule
  ],
  exports: [TablerIconsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
