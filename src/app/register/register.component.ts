import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form:FormGroup;
  public form2:FormGroup;

  emptyFieldError = false;
  user: any = {};
  identicalEmailsError = false;
  invalidEmailError = false;
  passwordLengthError = false;
  termAgreed = false;
  passwordMismatchError = false;
  passwordNotStrong = false;
  allCountries = '';
  allStates = '';
  emailSentSuccess = false;
  userOTP:number;
  emailVerified = false;
  emailVerifiedMsg = '';
  constructor(private auth: AuthServiceService, private router:Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      'stateName': new FormControl("Select State*"),
    });
    this.form2 = new FormGroup({
      'countryName': new FormControl("Select Country*"),
    });
  }

  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }



  submit() {
    this.identicalEmailsError = false;
    this.invalidEmailError = false;
    this.passwordLengthError = false;
    this.emptyFieldError = false;
    this.passwordMismatchError = false;
    this.passwordNotStrong = false;

    if (this.user.name && this.user.password && this.user.email) {

      this.checkPasswordLength();
      if (this.validateEmail(this.user.email) && this.user.password.length >= 8 && this.isPasswordStrong()) {
        this.user.createdDate = Date();
        this.auth.register(this.user).subscribe((data: any) => {
          if (data.success === true) {
            this.emptyFieldError = false;
            this.router.navigate(['login']);
          }
          else
            this.identicalEmailsError = true;
        });
      }
      else {
        if (!this.validateEmail(this.user.email)) {
          this.invalidEmailError = true;
        }
        if (this.user.password.length < 8) {
          this.passwordLengthError = true;
        }
        if (!this.isPasswordStrong()) {
          this.passwordNotStrong = true;
        }
      }
    }
    else {
      this.emptyFieldError = true;
    }
  }

 

  checkPasswordLength() {
    if (this.user.password.length < 8)
      this.passwordLengthError = true;
  }

  

  



  public isPasswordStrong(){
    const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/;
    return re.test(this.user.password);
  }

}