import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../../shared/services/users.service';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  updateUserInfoForm: FormGroup;
  isSubmit: boolean;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private userService: UsersService,
    public dialogRef: MatDialogRef<UpdateUserComponent>
  ) {}

  ngOnInit(): void {
    this.buildUpdateForm();
    this.getSingleUser();
  }

  /**Method to update user */
  updateUser(): void {
    this.userService
      .addUser()
      .doc(this.data.id)
      .update(this.updateUserInfoForm.getRawValue());

    this.dialogRef.close();
  }
  /**Method to get single user */
  private getSingleUser(): void {
    this.userService
      .addUser()
      .doc(this.data.id)
      .valueChanges()
      .subscribe(
        (res) => {
          this.updateUserInfoForm.patchValue({
            name: res?.name,
            email: res?.email,
            phoneNumber: res?.phoneNumber,
            country: res?.country,
            street: res?.street,
            zip: res?.zip,
            city: res?.city,
            gender: res?.gender,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private buildUpdateForm(): void {
    this.updateUserInfoForm = this.fb.group({
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
