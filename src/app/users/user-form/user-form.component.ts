import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  user: User = new User();

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.initForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((parameterMap) => {
      const id = Number(parameterMap.get('id'));
      this.findById(id);
    });
  }

  findById(id: number) {
    this.userService.findById(id).subscribe((data) => {
      this.user = data;
      this.mapForm();
    });
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: [null],
      email: [null],
      cellphone: [null],
      username: [null],
      password: [null],
    });
  }

  onSubmit() {
    if (this.user.id && this.user.id > 0) {
      this.update();
    } else {
      this.create();
    }
  }

  mapForm() {
    this.userForm.controls['name'].setValue(this.user.name);
    this.userForm.controls['email'].setValue(this.user.email);
    this.userForm.controls['cellphone'].setValue(this.user.cellphone);
    this.userForm.controls['username'].setValue(this.user.username);
    this.userForm.controls['password'].setValue('');
  }

  private showMessage(message: string, title: string) {
    this._snackBar.open(message, title, {
      duration: 3000,
    });
  }

  create() {
    this.userService.create(this.userForm.value).subscribe({
      next: (v) => {
        this.showMessage('User successfully created', 'Success');
        this.userForm = this.initForm();
      },
      error: (e) => this.showMessage('Error on create user', 'Error'),
    });
  }

  update() {
    this.userService.update(this.user.id, this.userForm.value).subscribe({
      next: (v) => {
        this.showMessage('User successfully updated', 'Success');
        this.userForm = this.initForm();
      },
      error: (e) => this.showMessage('Error on update user', 'Error'),
    });
  }

  onCancel() {
    this.userForm = this.initForm();
    this.router.navigate(['/users'], { relativeTo: this.route });
  }
}
