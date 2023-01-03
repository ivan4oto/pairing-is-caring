import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './modules/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ParingTableComponent } from './modules/paring-table/paring-table.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { GroupSelectComponent } from './modules/group-select/group-select.component';
import { ProfilePageComponent } from './modules/profile-page/profile-page.component';
import { ToastrModule } from 'ngx-toastr';
import { SessionDialogComponent } from './modules/session-dialog/session-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SessionEditComponent } from './modules/session-edit/session-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ParingTableComponent,
    GroupSelectComponent,
    ProfilePageComponent,
    SessionDialogComponent,
    SessionEditComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
