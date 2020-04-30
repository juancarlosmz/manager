import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UserProfileEditorComponent } from 'src/app/pages/user-profile-editor/user-profile-editor.component';
import { PaidComponent } from 'src/app/pages/order/paid/paid.component';
import { PendingComponent } from 'src/app/pages/order/pending/pending.component';
import { ActivityComponent } from '../../pages/order/activity/activity.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, children: [
        { path: '', component: PaidComponent},
        { path: 'paid', component: PaidComponent},
        { path: 'pending', component: PendingComponent},
        { path: 'activity', component: ActivityComponent}
      ]
    },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'user-profile-editor', component: UserProfileEditorComponent },

];
