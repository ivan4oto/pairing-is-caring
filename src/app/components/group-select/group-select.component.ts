import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/accounts';
import { PairingGroup } from 'src/app/models/pairing-sessions';
import { AlertsService } from 'src/app/services/alerts/alerts.service';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { JwtService } from 'src/app/services/jwt/jwt.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-group-select',
  templateUrl: './group-select.component.html',
  styleUrls: ['./group-select.component.scss']
})

export class GroupSelectComponent implements OnInit {
  public user: Account;
  public groupCreateForm!: FormGroup; 
  public groupSelectForm!: FormGroup; 
  public availableGroups!: PairingGroup[];



  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private groupService: GroupsService,
    private alertsService: AlertsService,
    private router: Router,
    ) { 
    this.user = this.jwtService.getUser();
  }

  ngOnInit(): void {
    this.userService.getGroups().subscribe(response => this.availableGroups = response );
    this.buildGroupCreateForm();
    this.buildGroupSelectForm();
  }

  createGroup() {
    const groupName: string = this.groupCreateForm.controls['groupName'].value;
    const group = { name: groupName, createdBy: this.user.username, ownedBy: this.user.username } as PairingGroup;
    this.groupService.postGroup(group).subscribe((response) => {
      this.alertsService.showSuccessMsg(
        `You have successfully created the group ${groupName}`,
        'Create group has been successful'
      )
    }, (error) => {
      this.alertsService.showErrorMsg('An error has occurred while creating group. Please check details or contact us.', 'Error creating group.')
    });
  }

  joinGroup() {
    console.log('joinnniing')
    const selectedGroup: PairingGroup = this.groupSelectForm.value.groupSelectedName
    this.user.pairing_group = selectedGroup
    this.userService.updateUser(this.user).subscribe((response) => {
      this.groupService.setGroup(selectedGroup)
      this.alertsService.showSuccessMsg(
        `You have successfully joined group ${selectedGroup.name}`,
        'Join Group Success'
      )
      this.router.navigate(['home'])
    })
  }

  public buildGroupCreateForm() {
    this.groupCreateForm = new FormGroup({
      groupName: new FormControl('', [Validators.required]),
    });
  }

  public buildGroupSelectForm() {
    this.groupSelectForm = new FormGroup({
      groupSelectedName: new FormControl('', [Validators.required]),
    });
  }

  public isUserLogged(): boolean {
    return this.jwtService.isLoggedIn();
  }
}
