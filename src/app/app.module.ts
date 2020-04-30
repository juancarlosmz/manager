import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ErrorComponent } from './pages/error/error.component';
import { UsersComponent } from './pages/users/users.component';
import { RegisteruserComponent } from './pages/registeruser/registeruser.component';
import { UserService } from './services/user.service';
import { UserProfileEditorComponent } from './pages/user-profile-editor/user-profile-editor.component';
import { PaidComponent } from './pages/order/paid/paid.component';
import { PendingComponent } from './pages/order/pending/pending.component';
import { ActivityComponent } from './pages/order/activity/activity.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ErrorComponent,
    UsersComponent,
    RegisteruserComponent,
    UserProfileEditorComponent,
    PaidComponent,
    PendingComponent,
    ActivityComponent,
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
