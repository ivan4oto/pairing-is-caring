import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { PairingSession } from 'src/app/models/pairing-sessions';

@Component({
  selector: 'app-session-dialog',
  templateUrl: './session-dialog.component.html',
  styleUrls: ['./session-dialog.component.scss']
})
export class SessionDialogComponent implements OnInit {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PairingSession,
    private _ngZone: NgZone
    ) { }

    @ViewChild('autosize') autosize!: CdkTextareaAutosize;
    public sessionEditForm!: FormGroup;
    public disabled: boolean = true;
    
  ngOnInit(): void {
    console.log(this.data);
    this.buildSessionEditForm();
  }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  public buildSessionEditForm() {
    this.sessionEditForm = new FormGroup({
      description: new FormControl({
        value: 'dwaidowaidowaijdowiajdow',
        disabled: true
      }),
    });
  }

  public setDisabledFalse() {
    this.disabled = false;
    console.log(this.disabled);
  }
}
