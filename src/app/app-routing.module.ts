import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRoleGuardService } from './services/AdminRoleGuard/admin-role-guard.service';
import { ListComponent } from './user/list/list.component';
import { ListComponent as JoborderComponent } from './joborder/list/list.component';
import { ListComponent as SubscriptionComponent } from './subscription/list/list.component';
import { ListComponent as InvoiceComponent } from './invoice/list/list.component';
import { ListComponent as ReportedUsers } from './reportedusers/list/list.component';
import { ListComponent as UserLogs } from './userlogs/list/list.component';
import { ListComponent as Payments } from './payment/list/list.component';
import { ListComponent as Contract } from './contract/list/list.component';
import { ListComponent as Feedback } from './feedback/list/list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/Administrator' },
  { path: 'Administrator', pathMatch: 'full', redirectTo: '/Administrator/Dashboard' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'Administrator', component: AdminComponent, canActivate: [AdminRoleGuardService], data: { expectedRole: 'Administrator'} },
  { path: 'Administrator/Dashboard', component: DashboardComponent, canActivate: [AdminRoleGuardService], data: { expectedRole: 'Administrator'} },
  { path: 'Administrator/Users', component: ListComponent, canActivate: [AdminRoleGuardService], data: { expectedRole: 'Administrator'} },
  { path: 'Administrator/Joborder', component: JoborderComponent, canActivate: [AdminRoleGuardService], data: { expectedRole: 'Administrator'} },
  { path: 'Administrator/Subscription', component: SubscriptionComponent, canActivate: [AdminRoleGuardService], data: { expectedRole: 'Administrator'} },
  { path: 'Administrator/Invoice', component: InvoiceComponent, canActivate: [AdminRoleGuardService], data: { expectedRole: 'Administrator'} },
  { path: 'Administrator/ReportedUsers', component: ReportedUsers, canActivate: [AdminRoleGuardService], data: { expectedRole: 'Administrator'} },
  { path: 'Administrator/UserLogs', component: UserLogs, canActivate: [AdminRoleGuardService], data: { expectedRole: 'Administrator'} },
  { path: 'Administrator/Payments', component: Payments, canActivate: [AdminRoleGuardService], data: { expectedRole: 'Administrator'} },
  { path: 'Administrator/Contract', component: Contract, canActivate: [AdminRoleGuardService], data: { expectedRole: 'Administrator'} },
  { path: 'Administrator/Feedback', component: Feedback, canActivate: [AdminRoleGuardService], data: { expectedRole: 'Administrator'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
