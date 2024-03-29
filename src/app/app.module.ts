import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs'
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ParingTableComponent } from './components/paring-table/paring-table.component';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { GroupSelectComponent } from './components/group-select/group-select.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { ToastrModule } from 'ngx-toastr';
import { SessionDialogComponent } from './components/session-dialog/session-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { UserOverviewComponent } from './components/user-overview/user-overview.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { SessionConfirmationDialogComponent } from './components/session-confirmation-dialog/session-confirmation-dialog.component';
import { FooterComponent } from './components/footer/footer.component';

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
    UnauthorizedComponent,
    UserOverviewComponent,
    ImageUploadComponent,
    SessionConfirmationDialogComponent,
    FooterComponent,
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
    MatTabsModule,
    MatTooltipModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
