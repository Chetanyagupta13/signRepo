import { AuthServiceService } from './../register/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any = {};
  userPass: any = {};

  showError = false;
  emailError = false;
  passwordError = false;
  showLoginError = false;
  existingPassword: any;
  emailOfUser: any;
  forgotpassword:any={}
  emailId: any;
  invalidPasswordChange:boolean=false;
  correctEmail: boolean=false;
  constructor(private auth: AuthServiceService, private router: Router) { }

  ngOnInit() {
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  submit() {
    this.emailError = false;
    this.passwordError = false;
    this.showError = false;
    this.showLoginError = false;
    if (this.user.email && this.user.password) {


      if (this.validateEmail(this.user.email) && this.user.password.length >= 5) {
        this.auth.login(this.user).subscribe((data: any) => {
          if (data.success) {
            // localStorage.setItem('token', JSON.stringify(data.token))
            // localStorage.setItem('name', data.name)
            localStorage.setItem('email', data.email)
            // localStorage.setItem('profile_image', data.profile_image)
            this.router.navigate(['profile']);
          } else {
            this.showError = true;
          }
        },
          err => {
            this.showError = true;
          })
      }
      else {
        if (!this.validateEmail(this.user.email))
          this.emailError = true;
        else
          this.emailError = false;
        if (this.user.password.length < 5)
          this.passwordError = true;
        else
          this.passwordError = false;
      }
    }
    else {
      this.showLoginError = true;
    }
  }

  
}
