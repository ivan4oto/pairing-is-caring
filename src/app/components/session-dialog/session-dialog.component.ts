import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { PairingSession } from 'src/app/models/pairing-sessions';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { SessionsService } from 'src/app/services/sessions/sessions.service';

@Component({
  selector: 'app-session-dialog',
  templateUrl: './session-dialog.component.html',
  styleUrls: ['./session-dialog.component.scss']
})
export class SessionDialogComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PairingSession,
    private _ngZone: NgZone,
    private sessionsService: SessionsService,
    private alertsService: AlertsService
    ) {
      this.sessionDescription = data.description;
      this.sessionTitle = data.title;
    }

    @ViewChild('autosize') autosize!: CdkTextareaAutosize;
    public sessionEditForm!: FormGroup;
    public disabled: boolean = true;
    public sessionTitle: string;
    public sessionDescription: string;
    
  ngOnInit(): void {
    console.log(this.data);
    this.buildSessionEditForm();
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  public buildSessionEditForm(): void {
    this.sessionEditForm = new FormGroup({
      description: new FormControl(
        {value: this.sessionDescription, disabled: true}),
      title: new FormControl(
        {value: this.sessionTitle, disabled: true}
      )
    });
  }

  public enableEditDescription(): void {
    this.sessionEditForm.controls['description'].enable();
    this.sessionEditForm.controls['title'].enable();
  }

  public editSessionSave(): void {
    const title = this.sessionEditForm.controls['title'].value;
    const description = this.sessionEditForm.controls['description'].value;

    const sessionToUpdate: PairingSession = this.data;
    sessionToUpdate.description = description;
    sessionToUpdate.title = title;
    
    this.sessionsService.updateSession(sessionToUpdate).subscribe(
      success => {
        this.alertsService.showSuccessMsg('Update has been successful!', 'Success');
      },
      err => {
        this.alertsService.showErrorMsg('Error has occured!', 'Error');
      }
    );
  }
}
