import { Routes } from '@angular/router';
import { CallLogListComponent } from './call-logs/call-log-list.component';
import { CallLogDetailsComponent } from './call-logs/call-log-details/call-log-details.component';
import { CallLogListResolverService } from './call-logs/shared/call-log-list-resolver.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CallLogDetailsResolverService } from './call-logs/shared/call-log-details-resolver.service';


export const appRoutes: Routes = [
  { path: 'call-logs/:id', component: CallLogDetailsComponent, resolve: { callLog: CallLogDetailsResolverService } },
  { path: 'call-logs', component: CallLogListComponent, resolve: { list: CallLogListResolverService } },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'call-logs', pathMatch: 'full' }
];
