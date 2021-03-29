import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LocalUserModel, LogModel, LogService, ModalService, UserModel, UsersService } from '../../shared';
import { LocalStorage } from 'ngx-store';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/api/login.service';
import { Observable, throwError } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  @LocalStorage() remember = false;
  @LocalStorage() localUser: LocalUserModel;

  constructor(private fb: FormBuilder,
    private datePipe: DatePipe,
    private modalService: ModalService,
    private userService: UsersService,
    private logService: LogService,
    private loginService: LoginService,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  ngOnInit(): void {
    if (this.remember) {
      if (this.localUser) {
        this.loginForm.get('email').setValue(this.localUser.email);
        this.loginForm.get('pwd').setValue(this.localUser.password);
      }
      this.loginForm.get('remember').setValue(this.remember);
    }
  }

  onLogin(): void {
    this.isLoading = true;
    const remember = this.loginForm.controls.remember.value;
    const email = this.loginForm.controls.email.value;
    const pwd = this.loginForm.controls.pwd.value;
    this.loginService.loginWithUserName(email, pwd).subscribe(user => {
      if (user) {
        this.loginService.user = user as UserModel;
        this.loginService.isAuthenticated = true;
        if (remember) {
          this.remember = true;
          const local = new LocalUserModel();
          local.email = email;
          local.password = pwd;
          this.localUser = local;
        } else {
          this.remember = false;
          this.localUser = null;
        }
        this.isLoading = false;
        this.router.navigateByUrl('pages/dashboard');
      } else {
        this.isLoading = false;
        this.modalService.warning('Invalid email or password.');
      }
    },
    err => {
      this.isLoading = false;
      this.modalService.warning('Invalid email or password.');
    });
  }
}
