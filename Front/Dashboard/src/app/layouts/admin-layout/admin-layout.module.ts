import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { BatchComponent } from '../../batch/batch.component';
import { IconsComponent } from '../../icons/icons.component';
import { StorageComponent } from '../../storage/storage.component';
import { SectionsComponent } from '../../sections/sections.component';
import { SlotsComponent } from '../../slots/slots.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    BatchComponent,
    IconsComponent,
    StorageComponent,
    SectionsComponent,
    SlotsComponent
  ]
})

export class AdminLayoutModule {}
