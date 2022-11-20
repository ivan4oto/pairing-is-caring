import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PairingSession } from 'src/app/models/pairing-sessions';

@Component({
  selector: 'app-session-dialog',
  templateUrl: './session-dialog.component.html',
  styleUrls: ['./session-dialog.component.scss']
})
export class SessionDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: PairingSession) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
