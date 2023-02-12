import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule} from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt'
import { TokenInterceptorService } from './services/TokenInterceptor/token-interceptor.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { AccountSettingsComponent } from './account/update/accountsettings/account-settings.component';
import { ChangepasswordComponent } from './account/update/changepassword/changepassword.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DataReloadService } from './services/DataReload/data-reload.service';
import { ChangeavatarComponent } from './account/update/changeavatar/changeavatar.component';
import { UsersettingsComponent } from './user/update/usersettings/usersettings.component';
import { ListComponent } from './user/list/list.component';
import { ListComponent as JoborderComponent } from './joborder/list/list.component';
import { ListComponent as SubscriptionComponent } from './subscription/list/list.component';
import { ListComponent as InvoiceComponent } from './invoice/list/list.component';
import { ListComponent as ReportedUsersComponent } from './reportedusers/list/list.component';
import { ListComponent as UserLogsComponent } from './userlogs/list/list.component';
import { ListComponent as PaymentComponent } from './payment/list/list.component';
import { ListComponent as ContractComponent } from './contract/list/list.component';
import { ListComponent as FeedbackComponent } from './feedback/list/list.component';
import { ViewpaymentComponent } from './invoice/viewpayment/viewpayment.component';
import { ViewinvoiceComponent } from './payment/viewinvoice/viewinvoice.component';
import { ViewsubscriptionComponent } from './payment/viewsubscription/viewsubscription.component';
import { ViewpaymentComponent as ViewSubscriptionDetailComponent } from './subscription/viewpayment/viewpayment.component';
import { UpdatecontractfileComponent } from './contract/updatecontractfile/updatecontractfile.component';
import { NgApexchartsModule } from "ng-apexcharts";

// CommonJS
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AdminComponent,
    LoadingSpinnerComponent,
    DashboardComponent,
    AccountSettingsComponent,
    ChangepasswordComponent,
    ChangeavatarComponent,
    UsersettingsComponent,
    ListComponent,
    JoborderComponent,
    SubscriptionComponent,
    InvoiceComponent,
    ViewpaymentComponent,
    ReportedUsersComponent,
    UserLogsComponent,
    PaymentComponent,
    ViewinvoiceComponent,
    ViewsubscriptionComponent,
    ContractComponent,
    UpdatecontractfileComponent,
    FeedbackComponent,
    ViewSubscriptionDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatExpansionModule,
    CommonModule,
    NgApexchartsModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    DataReloadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
