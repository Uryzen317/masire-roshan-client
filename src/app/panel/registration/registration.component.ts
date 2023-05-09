import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { RegistrationService } from '../services/registration.service';
import { environment } from "src/environments/environment";
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  constructor(
    public activatedRoute: ActivatedRoute,
    public registratinService: RegistrationService,
    public router: Router,
    public reCaptchaV3Service : ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    let googleAuth = this.activatedRoute.snapshot.queryParams['googleAuth'] || null;
    if(googleAuth){
      this.registratinService.googleAuth(googleAuth);
      this.router.navigate(['panel']);
    }

    this.activatedRoute.params
      .pipe(
        map(value => {
          return value['operation'];
        })
      )
      .subscribe({
        next: (value) : any => {
          this.regOp = value == 'signup' ? 1 : 0;
          if (value != 'signup' && value != 'login') {
            this.router.navigate(['/', 'panel', 'registeration', 'login']);
          }
        }
      });
  }

  environment = environment;
  // 0 = login , 1 = signup
  regOp: number = 0;
  isLoginPassShown: boolean = false;
  isSignupPassShown: boolean = false;
  isSignupCheckShown: boolean = false;
  loginInputsFilled: boolean[] = [false, false];
  signupInputsFilled: boolean[] = [false, false, false, false];
  isLoginRememberMe: boolean = false;
  isSignupRememberMe: boolean = false;
  loginErrors: any = {
    username: {
      error: '',
      required: 'لطفا نام کاربری یا ایمیل خود را وارد کنید',
      minLength: 'نام کاربری باید بلندتر از 5 حرف باشد',
      maxLength: 'نام کاربری باید کوتاهتر از 74 حرف باشد'
    },
    password: {
      error: '',
      required: 'لطفا رمز عبور خود را وارد کنید',
      minLength: 'رمز عبور باید بلندتر از 5 حرف باشد',
      maxLength: 'رمز عبور باید کوتاهتر از 30 حرف باشد'
    }
  };
  signupErrors: any = {
    username: {
      error: '',
      required: 'لطفا نام کاربری خود را وارد کنید',
      minLength: 'نام کاربری باید بلندتر از 5 حرف باشد',
      maxLength: 'نام کاربری باید کوتاهتر از 74 حرف باشد'
    },
    email: {
      error: '',
      required: 'لطفا ایمیل خود را وارد کنید',
      minLength: 'ایمیل باید بلندتر از 5 حرف باشد',
      maxLength: 'ایمیل باید کوتاهتر از 74 حرف باشد',
      email: 'لطفا ایمیل معتبری وارد کنید'
    },
    password: {
      error: '',
      required: 'لطفا رمز عبور خود را وارد کنید',
      minLength: 'رمز عبور باید بلندتر از 5 حرف باشد',
      maxLength: 'رمز عبور باید کوتاهتر از 30 حرف باشد'
    },
    check: {
      error: '',
      required: 'لطفا رمز عبور خود را تکرار کنید'
    }
  };

  loginForm: any = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(74)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ])
  });
  signupForm: any = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(74)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(74),
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ]),
    check: new FormControl('', Validators.required)
  });

  toggleLoginInputsFilled(index: number, value: boolean): boolean | void {
    if (value) return (this.loginInputsFilled[index] = true);
    this.loginInputsFilled[index] = this.loginForm.value[
      Object.keys(this.loginForm.value)[index]
    ]
      ? true
      : false;
  }
  toggleSignupInputsFilled(index: number, value: boolean): boolean | void {
    if (value) return (this.signupInputsFilled[index] = true);
    this.signupInputsFilled[index] = this.signupForm.value[
      Object.keys(this.signupForm.value)[index]
    ]
      ? true
      : false;
  }

  login(): void {
    this.registratinService
      .login({
        username: this.loginForm.value['username'],
        password: this.loginForm.value['password'],
        rememberme: this.isLoginRememberMe
      })
      .subscribe({
        next: value => {
          this.router.navigate(['panel']);
        },
        error: error => {
          this.loginErrors.username.error = error.error.message;
        }
      });
  }

  signup(): void {
    this.registratinService
      .signup({
        username: this.signupForm.value['username'],
        email: this.signupForm.value['email'],
        password: this.signupForm.value['password'],
        rememberme: this.isSignupRememberMe
      })
      .subscribe({
        next: value => {
          this.router.navigate(['/panel/']);
        },
        error: error => {
          this.signupErrors.username.error = error.error.message;
        }
      });
  }

  loginSubmit(): void {
    // basic client-sided validation
    // clear previous error out
    for (let field in this.loginErrors) {
      this.loginErrors[field].error = '';
    }
    // handle validation
    for (let inputName in this.loginForm.value) {
      let input = this.loginForm.controls[inputName];
      if (input.status === 'INVALID') {
        // input is not valid
        let error = input.errors;
        error = Object.keys(error)[0];
        switch (error) {
          case 'required': {
            this.loginErrors[inputName].error = this.loginErrors[
              inputName
            ].required;
            break;
          }
          case 'minlength': {
            this.loginErrors[inputName].error = this.loginErrors[
              inputName
            ].minLength;
            break;
          }
          case 'maxlength': {
            this.loginErrors[inputName].error = this.loginErrors[
              inputName
            ].maxLength;
            break;
          }
        }
      }
    }
    // check if everything is okey and handle request
    let errorsList = [];
    for (let inputName of Object.keys(this.loginErrors)) {
      if (!this.loginErrors[inputName].error) {
        errorsList.push(1);
      }
    }
    if (errorsList.length == Object.keys(this.loginErrors).length) {
      // recaptcha vaildation
      this.reCaptchaV3Service.execute('importantAction')
      .subscribe({next : (token)=>{
        this.registratinService.checkRecaptcha(token).subscribe({next : value =>{
          this.login();
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

  signupSubmit(): void {
    // clear previous error out
    for (let field in this.signupErrors) {
      this.signupErrors[field].error = '';
    }
    // handle validation
    for (let inputName in this.signupForm.value) {
      let input = this.signupForm.controls[inputName];
      if (input.status === 'INVALID') {
        // input is not valid
        let error = input.errors;
        error = Object.keys(error)[0];
        switch (error) {
          case 'required': {
            this.signupErrors[inputName].error = this.signupErrors[
              inputName
            ].required;
            break;
          }
          case 'minlength': {
            this.signupErrors[inputName].error = this.signupErrors[
              inputName
            ].minLength;
            break;
          }
          case 'maxlength': {
            this.signupErrors[inputName].error = this.signupErrors[
              inputName
            ].maxLength;
            break;
          }
          case 'email': {
            this.signupErrors[inputName].error = this.signupErrors[
              inputName
            ].email;
            break;
          }
        }
      }
    }
    // password repeat correction check
    if (this.signupForm.value['check'] !== this.signupForm.value['password']) {
      this.signupErrors.check.error = 'لطفا رمز عبور را بدرستی تکرار کنید';
    }

    // check if everything is okey and handle request
    let errorsList = [];
    for (let inputName of Object.keys(this.signupErrors)) {
      if (!this.signupErrors[inputName].error) {
        errorsList.push(1);
      }
    }
    if (errorsList.length == Object.keys(this.signupErrors).length) {
      this.signup();
    }
  }
}
