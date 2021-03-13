import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UsersService } from '../../shared/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from './modals/update-user/update-user.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  userInfoForm: FormGroup;
  isSubmit: boolean;
  dataSource: MatTableDataSource<{ id: string }>;
  displayedColumns: string[] = [
    'name',
    'email',
    'phoneNumber',
    'gender',
    'street',
    'city',
    'zip',
    'country',
    'action',
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getUserData();
  }

  /**Dialog for update user */

  updateUserDialog(id: string): void {
    let dialogRef = this.dialog.open(UpdateUserComponent, {
      data: {
        id: id,
      },
      height: 'auto',
      width: '50%',
    });
  }

  /** Method to delete the users */
  deleteUser(id: string): void {
    this.userService.addUser().doc(id).delete();
  }

  /** Method to filter the users */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Method to submit the form and display in table */
  submitUserInfoForm(): void {
    if (this.userInfoForm.invalid) {
      this.isSubmit = true;
    } else {
      this.isSubmit = false;
    }
    this.userService.addUser().add(this.userInfoForm.getRawValue());
    this.getUserData();
    this.userInfoForm.reset();
  }

  /** Method to fetch the user data from firebase database */
  private getUserData(): void {
    this.userService.getUserDetails().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    });
  }

  private buildForm(): void {
    /**User info form controls */
    this.userInfoForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('(?=.*[0-9]).{10}')],
      ],
      gender: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('(?=.*[0-9]).{6}')]],
      country: ['', Validators.required],
    });
  }
}
