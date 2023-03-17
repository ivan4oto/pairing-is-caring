import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-session-confirmation-dialog',
  templateUrl: './session-confirmation-dialog.component.html',
  styleUrls: ['./session-confirmation-dialog.component.scss']
})
export class SessionConfirmationDialogComponent implements OnInit {
  public confirm: string = 'yes';
  public reject: string = 'no';

  constructor(
    public dialogRef: MatDialogRef<SessionConfirmationDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

}
