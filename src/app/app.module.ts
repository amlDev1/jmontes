import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';



import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CallLogService } from './call-logs/shared/call-log.service';
import { UserService } from './users/shared/user.service';
import { StatusService } from './common/status.service';
import { CallLogListComponent } from './call-logs/call-log-list.component';
import { appRoutes } from './routes';
import { CallLogDetailsComponent } from './call-logs/call-log-details/call-log-details.component';
import { CallLogListResolverService } from './call-logs/shared/call-log-list-resolver.service';
import { AlertService } from './common/alert.service';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CallLogDetailsResolverService } from './call-logs/shared/call-log-details-resolver.service'




@NgModule({
  declarations: [
    AppComponent,
    CallLogListComponent,
    CallLogDetailsComponent,
    NavComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    CallLogService
    , UserService
    , StatusService
    , CallLogListResolverService
    , CallLogDetailsResolverService
    , AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
