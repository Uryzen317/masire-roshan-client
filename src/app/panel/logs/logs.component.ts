import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
})
export class LogsComponent implements OnInit {
  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .post(
        `${environment.apiServer}users/logsList`,
        { accessToken: localStorage.getItem('accessToken') },
        { responseType: 'json' }
      )
      .pipe(
        tap((value: any) => {
          value.map((val: any) => {
            val.operation =
              this.operations.find((opt: any) => {
                return opt.key === val.operation;
              })?.value || val.operation;
          });
          return value;
        })
      )
      .subscribe({
        next: (value) => {
          this.logs = value;
        },
      });
  }

  environment = environment;
  logs: any;
  operations: any = [
    {
      key: 'add-post',
      value: 'افزودن پست',
    },
    {
      key: 'add-post failed',
      value: 'افزودن پست خطا',
    },
    {
      key: 'add-game',
      value: 'افزودن عنوان',
    },
    {
      key: 'add-game failed',
      value: 'افزودن عنوان خطا',
    },
    {
      key: 'add-tag',
      value: 'افزودن بازی',
    },
    {
      key: 'delete-tag',
      value: 'حذف تگ',
    },
    {
      key: 'delete-tag failed',
      value: 'حذف تگ خطا',
    },
    {
      key: 'add-tag failed',
      value: 'افزودن بازی خطا',
    },
    {
      key: 'edit-game',
      value: 'ویرایش عنوان',
    },
    {
      key: 'remove-post',
      value: 'حذف پست',
    },
    {
      key: 'remove-post failed',
      value: 'حذف پست خطا',
    },
    {
      key: 'edit-game failed',
      value: 'ویرایش عنوان خطا',
    },
    {
      key: 'delete-game',
      value: 'حذف عنوان',
    },
    {
      key: 'delete-game failed',
      value: 'خطای حذف عنوان',
    },
    {
      key: 'edit-mainPage',
      value: 'ویرایش صفحه اصلی',
    },
    {
      key: 'edit-mainPage fail',
      value: 'ویرایش صفحه اصلی خطا',
    },
    {
      key: 'login',
      value: ' ورود ',
    },
    {
      key: 'login failed',
      value: 'ورود   خطا',
    },
    {
      key: 'singup',
      value: 'ثبت نام',
    },
    {
      key: 'singup failed',
      value: 'ثبت نام خطا',
    },
    {
      key: 'login-google',
      value: ' ورود با گوگل ',
    },
    {
      key: 'login-google failed',
      value: 'ورود با گوگل   خطا',
    },
    {
      key: 'signup-google',
      value: 'ثبت نام با گوگل',
    },
    {
      key: 'signup-google failed',
      value: 'ثبت نام با گوگل خطا',
    },
  ];
}
