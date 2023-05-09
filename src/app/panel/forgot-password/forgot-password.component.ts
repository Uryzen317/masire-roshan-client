import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { RegistrationService } from '../services/registration.service';
import { environment } from "src/environments/environment";
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
constructor(
    public activatedRoute: ActivatedRoute,
    public registratinService: RegistrationService,
    public router: Router,
    public reCaptchaV3Service : ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params['token'];
  }

  environment = environment;
  loginInputsFilled: boolean[] = [false, false];
  token: any;
  loginErrors: any = {
    username: {
      error: '',
      required: 'لطفا ایمیل خود را وارد کنید',
      minLength: 'نام کاربری باید بلندتر از 5 حرف باشد',
      maxLength: 'نام کاربری باید کوتاهتر از 74 حرف باشد'
    }
  };
  setPasswordError : null | string = null;

  loginForm: any = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(74)
    ]),
  });
  passwordForm: any = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(74)
    ]),
  });

  toggleLoginInputsFilled(index: number, value: boolean): boolean | void {
    if (value) return (this.loginInputsFilled[index] = true);
    this.loginInputsFilled[index] = this.loginForm.value[
      Object.keys(this.loginForm.value)[index]
    ]
      ? true
      : false;
  }

  forgotPassword(): void {
    this.registratinService
      .forgotPassword(this.loginForm.value['username'])
      .subscribe({
        next: value => {
          this.loginErrors.username.error = 'لینک ارسالی به ایمیلتان را تایید کنید'
        },
        error: error => {
          this.loginErrors.username.error = error.error.message;
        }
      });
  }

  loginSubmit(): void {
    // basic client-sided validation
    // clear previous error out
    this.loginErrors.username.error = '';

    // handle validation
    let usernameInput = this.loginForm.controls['username'];
    if (usernameInput.status === 'INVALID') {
      // input is not valid
      let error = usernameInput.errors;
      error = Object.keys(error)[0];
      switch (error) {
        case 'required': {
          this.loginErrors.username.error = this.loginErrors.username.required;
          break;
        }
        case 'minlength': {
          this.loginErrors.username.error = this.loginErrors.username.minLength;
          break;
        }
        case 'maxlength': {
          this.loginErrors.username.error = this.loginErrors.username.maxLength;
          break;
        }
      }
    }
    // check if everything is okey and handle request
    let errorsList = [];
      if (!this.loginErrors.username.error) {
        errorsList.push(1);
      }
    if (errorsList.length == Object.keys(this.loginErrors).length) {
      // recaptcha vaildation
      this.reCaptchaV3Service.execute('importantAction')
      .subscribe({next : (token)=>{
        this.registratinService.checkRecaptcha(token).subscribe({next : value =>{
          this.forgotPassword();
        },
        error : error =>{
          // my server error
          this.loginErrors.username.error = 'خطای اعتبار سنجی';
        }})
      },
      error : error =>{
        // my server error
        this.loginErrors.username.error = 'خطای اعتبار سنجی';
      }
      });
    }
  }

  setPassword(password : string){
  this.setPasswordError = null;

    // again basic validation
    if(password.length < 5 || password.length > 64){
      this.setPasswordError = 'رمز عبور باید بین 5 تا 64 کاراکتر باشد';
      return ;
    }

    // recaptcha vaildation
    this.reCaptchaV3Service.execute('importantAction')
    .subscribe({next : (token)=>{
      this.registratinService.checkRecaptcha(token).subscribe({next : value =>{
        this.registratinService.setPassword(password, this.token).subscribe({next : (value)=>{
          this.router.navigate(['/', 'panel', 'registeration', 'login'])
        },error : error =>{
          this.setPasswordError = 'خطا';
        }})
      },
      error : error =>{
        // my server error
        this.setPasswordError = 'خطای اعتبار سنجی';
      }})
      },
    })
  }
}
