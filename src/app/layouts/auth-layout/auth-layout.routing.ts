import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { UsersComponent } from '../../pages/users/users.component';
import { RegisteruserComponent } from '../../pages/registeruser/registeruser.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';

export const AuthLayoutRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'users', component: RegisterComponent, children: [
        { path: '', component: RegisteruserComponent},
        { path: 'register', component: RegisteruserComponent},
        { path: 'list', component: UsersComponent}
      ]
    },
    { path: 'profile/:name/:rol', component: UserProfileComponent },
    { path: 'profile', component: UserProfileComponent }

];
