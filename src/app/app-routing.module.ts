import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupSelectComponent } from './components/group-select/group-select.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RegisterComponent } from './components/register/register.component';
import { SessionEditComponent } from './components/session-edit/session-edit.component';

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
