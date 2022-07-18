import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: [null],
      password: [null],
    });
  }

  ngOnInit(): void {}

  onLogin() {
    this.authService.auth(this.loginForm.value).subscribe({
      next: (v) => {
        localStorage.setItem('token', v.token);
        this.router.navigate(['/users']);
      },
      error: (e) => this.onError(),
    });
  }

  private onError() {
    this._snackBar.open('Error on authentication', '', {
      duration: 3000,
    });
  }
}
