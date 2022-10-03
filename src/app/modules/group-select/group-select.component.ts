import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { Account, AccountOutputSerializer } from 'src/app/models/accounts';
import { PairingGroup } from 'src/app/models/pairing-sessions';
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
    private groupService: GroupsService
    ) { 
    this.user = this.jwtService.getUser();
  }

  ngOnInit(): void {
    this.userService.getGroups().subscribe(response => this.availableGroups = response );
    console.log(this.availableGroups);
    this.buildGroupCreateForm();
    this.buildGroupSelectForm();
    console.log(this.user)
  }

  // registrationForm = this.formBuilder.group({
  //   groupName: ['', [Validators.required]]
  // })

  // joinGroup(username: string | null) {
  //   if (!username) {
  //     throw new Error('You must be logged in to create new group!')
  //   }
  //   const groupName: string = this.groupCreateForm.controls['groupName'].value;
  //   this.userService.getUser(username).pipe(switchMap((account: Account) => {
  //     const accountToUpdate = account as AccountOutputSerializer;
  //     accountToUpdate.pairing_group = groupName;
  //     return this.userService.updateUser(accountToUpdate);
  //   })).subscribe(
  //     (updatedAccount: Account) => {
  //       console.log(updatedAccount);
  //     }
  //   );
  //   throw new Error('Method not implemented.');
  // }
  createGroup() {
    const groupName: string = this.groupCreateForm.controls['groupName'].value;
    const group = { name: groupName, createdBy: this.user.username, ownedBy: this.user.username } as PairingGroup;
    this.groupService.postGroup(group).subscribe(response => {
      console.log(response);
    });
  }

  joinGroup(user: Account) {
    const groupName: string = this.groupCreateForm.controls['groupName'].value;
    const group: PairingGroup = { name: groupName, createdBy: user.username, ownedBy: user.username };
    const userForUpdate = user as AccountOutputSerializer;
    userForUpdate.pairing_group = group;
    this.userService.updateUser(user).subscribe((response) => {
      console.log(response);
    })
  }

  public buildGroupCreateForm() {
    this.groupCreateForm = new FormGroup({
      groupName: new FormControl('', [Validators.required]),
    });
  }

  public buildGroupSelectForm() {
    this.groupSelectForm = new FormGroup({
      groupName: new FormControl('', [Validators.required]),
    });
  }

  public submitGroup() {
    throw new Error('Method not implemented.');
  }
}
