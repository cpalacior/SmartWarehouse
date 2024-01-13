import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { BatchComponent } from '../../batch/batch.component';
import { IconsComponent } from '../../icons/icons.component';
import { StorageComponent } from '../../storage/storage.component';
import { SectionsComponent } from '../../sections/sections.component';
import {SlotsComponent} from "../../slots/slots.component";
import { NotificationsComponent } from '../../notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'batch',     component: BatchComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'storage',           component: StorageComponent },
    { path: 'sections',  component: SectionsComponent },
    { path: 'slots',  component: SlotsComponent },
    { path: 'notifications',     component: NotificationsComponent },
];
