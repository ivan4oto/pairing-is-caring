import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupSelectComponent } from './modules/group-select/group-select.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ProfilePageComponent } from './modules/profile-page/profile-page.component';
import { RegisterComponent } from './modules/register/register.component';
import { SessionEditComponent } from './modules/session-edit/session-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'groups',
    component: GroupSelectComponent,
  },
  {
    path: 'profile-page',
    component: ProfilePageComponent
  },
  {
    path: 'session/:sessionId',
    component: SessionEditComponent,
    children: [
      {path: 'qs', redirectTo: 'edit'},
      {path: 'edit', component: SessionEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
